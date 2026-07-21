import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Status = "loading" | "confirmed" | "processing" | "notfound";

export default function BookingReturn() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [status, setStatus] = useState<Status>("loading");
  const [booking, setBooking] = useState<{ treatment_name: string; slot_start_at: string; amount_paid_pence: number | null } | null>(null);

  useEffect(() => {
    if (!sessionId) { setStatus("notfound"); return; }
    let cancelled = false;
    let tries = 0;

    const poll = async () => {
      const { data } = await supabase
        .from("bookings")
        .select("treatment_name, slot_start_at, amount_paid_pence, status")
        .eq("stripe_session_id", sessionId)
        .maybeSingle();

      if (cancelled) return;

      if (data?.status === "confirmed") {
        setBooking(data);
        setStatus("confirmed");
        return;
      }
      if (tries++ < 8) {
        setTimeout(poll, 1500);
      } else {
        setStatus("processing");
      }
    };
    poll();
    return () => { cancelled = true; };
  }, [sessionId]);

  return (
    <div className="min-h-dvh bg-cream text-ink flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full text-center bg-white/60 backdrop-blur border border-blush rounded-lg p-10 shadow-[0_30px_80px_-40px_rgba(120,80,60,0.4)]">
        {status === "loading" && (
          <>
            <div className="w-14 h-14 mx-auto mb-6 rounded-full border-2 border-rose border-t-transparent animate-spin" />
            <h1 className="font-display text-3xl mb-2">Confirming your booking…</h1>
            <p className="text-taupe text-sm">One moment while we finalise your payment.</p>
          </>
        )}
        {status === "confirmed" && booking && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-rose/15 flex items-center justify-center text-rose text-2xl">✓</div>
            <h1 className="font-display text-4xl mb-3">Booking confirmed</h1>
            <p className="text-taupe leading-relaxed mb-6">
              Thank you. Your deposit has been received and your appointment is secured.
            </p>
            <div className="bg-blush/40 rounded-md p-5 text-left text-sm space-y-2 mb-8">
              <div><span className="text-taupe">Treatment:</span> <span className="font-medium">{booking.treatment_name}</span></div>
              <div><span className="text-taupe">Date & time:</span> <span className="font-medium">{new Date(booking.slot_start_at).toLocaleString("en-GB", { timeZone: "Europe/London", dateStyle: "full", timeStyle: "short" })}</span></div>
              {booking.amount_paid_pence != null && (
                <div><span className="text-taupe">Deposit paid:</span> <span className="font-medium">£{(booking.amount_paid_pence / 100).toFixed(2)}</span></div>
              )}
            </div>
            <p className="text-xs text-taupe mb-6">
              Camilla will be in touch to confirm any final details. A reminder email will be sent nearer the time.
            </p>
            <Link to="/" className="btn-primary inline-block">Return home</Link>
          </>
        )}
        {status === "processing" && (
          <>
            <h1 className="font-display text-3xl mb-3">Payment received</h1>
            <p className="text-taupe leading-relaxed mb-6">
              Your payment has been processed. Confirmation is taking a moment longer than usual — please check your email or refresh in a minute.
            </p>
            <Link to="/" className="btn-primary inline-block">Return home</Link>
          </>
        )}
        {status === "notfound" && (
          <>
            <h1 className="font-display text-3xl mb-3">No booking found</h1>
            <p className="text-taupe mb-6">We couldn't locate your booking details.</p>
            <Link to="/" className="btn-primary inline-block">Return home</Link>
          </>
        )}
      </div>
    </div>
  );
}
