import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

// Canonical treatment catalogue — server is the source of truth for prices.
// Never trust prices from the client.
const TREATMENTS: Record<string, { name: string; durationMinutes: number; pricePence: number }> = {
  "swedish-30":  { name: "Swedish Massage (30 min)",              durationMinutes: 30, pricePence: 3000 },
  "swedish-45":  { name: "Swedish Massage (45 min)",              durationMinutes: 45, pricePence: 4500 },
  "swedish-60":  { name: "Swedish Massage (60 min)",              durationMinutes: 60, pricePence: 6000 },
  "swedish-75":  { name: "Swedish Massage (75 min)",              durationMinutes: 75, pricePence: 7500 },
  "bespoke-30":  { name: "Bespoke Restorative Massage (30 min)",  durationMinutes: 30, pricePence: 3500 },
  "bespoke-45":  { name: "Bespoke Restorative Massage (45 min)",  durationMinutes: 45, pricePence: 5000 },
  "bespoke-60":  { name: "Bespoke Restorative Massage (60 min)",  durationMinutes: 60, pricePence: 6500 },
  "bespoke-75":  { name: "Bespoke Restorative Massage (75 min)",  durationMinutes: 75, pricePence: 8000 },
  "foot-30":     { name: "Restorative Foot Ritual (30 min)",      durationMinutes: 30, pricePence: 2500 },
  "scalp-25":    { name: "Rebalancing Scalp Massage (25 min)",    durationMinutes: 25, pricePence: 2000 },
};

// 50% deposit per booking policy.
const DEPOSIT_PERCENT = 50;

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

interface CheckoutRequest {
  treatmentKey: string;
  slotStartAt: string;      // ISO
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  environment: StripeEnv;
  returnUrl: string;        // e.g. https://site/booking-return?session_id={CHECKOUT_SESSION_ID}
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    const body = (await req.json()) as CheckoutRequest;

    // Basic validation
    const required = ["treatmentKey", "slotStartAt", "customerName", "customerEmail", "customerPhone", "environment", "returnUrl"] as const;
    for (const k of required) {
      if (!body[k] || typeof body[k] !== "string") {
        return jsonResponse({ error: `Missing or invalid field: ${k}` }, 400);
      }
    }
    if (body.environment !== "sandbox" && body.environment !== "live") {
      return jsonResponse({ error: "Invalid environment" }, 400);
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.customerEmail)) {
      return jsonResponse({ error: "Invalid email" }, 400);
    }

    const treatment = TREATMENTS[body.treatmentKey];
    if (!treatment) return jsonResponse({ error: "Unknown treatment" }, 400);

    const slotStart = new Date(body.slotStartAt);
    if (isNaN(slotStart.getTime())) return jsonResponse({ error: "Invalid slot" }, 400);
    if (slotStart.getTime() <= Date.now()) return jsonResponse({ error: "Slot must be in the future" }, 400);

    const slotEnd = new Date(slotStart.getTime() + treatment.durationMinutes * 60_000);

    // Free stale slots before checking availability.
    await supabase.rpc("expire_stale_pending_bookings").catch(() => { /* helper exists in DB */ });

    // Slot-lock check — reject if a live pending/confirmed booking overlaps this start time.
    const { data: clash, error: clashErr } = await supabase
      .from("bookings")
      .select("id, status")
      .in("status", ["pending", "confirmed"])
      .eq("slot_start_at", slotStart.toISOString())
      .maybeSingle();
    if (clashErr) {
      console.error("Slot check failed:", clashErr);
      return jsonResponse({ error: "Could not verify slot" }, 500);
    }
    if (clash) return jsonResponse({ error: "This time slot is no longer available" }, 409);

    const depositPence = Math.round((treatment.pricePence * DEPOSIT_PERCENT) / 100);

    // Insert the pending booking (server-authoritative price).
    const { data: booking, error: insertErr } = await supabase
      .from("bookings")
      .insert({
        treatment_name: treatment.name,
        duration_minutes: treatment.durationMinutes,
        price_pence: treatment.pricePence,
        currency: "gbp",
        slot_start_at: slotStart.toISOString(),
        slot_end_at: slotEnd.toISOString(),
        customer_name: body.customerName.trim(),
        customer_email: body.customerEmail.trim().toLowerCase(),
        customer_phone: body.customerPhone.trim(),
        notes: body.notes?.trim() || null,
        status: "pending",
      })
      .select("id")
      .single();

    if (insertErr || !booking) {
      console.error("Booking insert failed:", insertErr);
      return jsonResponse({ error: "Could not create booking" }, 500);
    }

    const stripe = createStripeClient(body.environment);

    // In-person UK service — no managed_payments, no automatic_tax.
    // User handles VAT themselves.
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "embedded_page",
      return_url: body.returnUrl,
      customer_email: body.customerEmail.trim().toLowerCase(),
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "gbp",
          unit_amount: depositPence,
          product_data: {
            name: `${treatment.name} — 50% deposit`,
            description: `Deposit for ${slotStart.toLocaleString("en-GB", { timeZone: "Europe/London" })} at The Restoration Room. Balance of £${((treatment.pricePence - depositPence) / 100).toFixed(2)} due on the day.`,
          },
        },
      }],
      payment_intent_data: {
        description: `${treatment.name} deposit — booking ${booking.id}`,
        metadata: { bookingId: booking.id },
      },
      metadata: {
        bookingId: booking.id,
        treatmentKey: body.treatmentKey,
      },
    });

    // Persist session id so the webhook can locate the booking.
    await supabase
      .from("bookings")
      .update({ stripe_session_id: session.id })
      .eq("id", booking.id);

    return jsonResponse({
      clientSecret: session.client_secret,
      bookingId: booking.id,
    });
  } catch (err) {
    console.error("create-checkout error:", err);
    return jsonResponse({ error: err instanceof Error ? err.message : "Unknown error" }, 500);
  }
});
