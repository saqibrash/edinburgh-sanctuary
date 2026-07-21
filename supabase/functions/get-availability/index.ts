import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    // Accept ?date=YYYY-MM-DD or JSON body { date }
    let date = url.searchParams.get("date") ?? "";
    if (!date && req.method === "POST") {
      try {
        const body = await req.json();
        date = String(body?.date ?? "");
      } catch { /* ignore */ }
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return new Response(JSON.stringify({ error: "Invalid or missing date (expected YYYY-MM-DD)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Compute Europe/London day boundaries in UTC.
    // Simple approach: query a generous UTC window around the local date and
    // let the client convert; enough for a small booking site.
    const dayStartUtc = new Date(`${date}T00:00:00Z`);
    const rangeStart = new Date(dayStartUtc.getTime() - 2 * 60 * 60 * 1000).toISOString();
    const rangeEnd = new Date(dayStartUtc.getTime() + 26 * 60 * 60 * 1000).toISOString();

    const nowIso = new Date().toISOString();

    const { data, error } = await supabase
      .from("bookings")
      .select("slot_start_at,status,pending_expires_at")
      .gte("slot_start_at", rangeStart)
      .lt("slot_start_at", rangeEnd)
      .in("status", ["pending", "confirmed"]);

    if (error) throw error;

    const busy = (data ?? [])
      .filter((b) => b.status === "confirmed" || (b.pending_expires_at && b.pending_expires_at > nowIso))
      .map((b) => b.slot_start_at);

    return new Response(JSON.stringify({ date, busy }), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch (e) {
    console.error("get-availability error:", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
