
-- Enum for booking status
DO $$ BEGIN
  CREATE TYPE public.booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'expired');
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  treatment_name TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  price_pence INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'gbp',
  slot_start_at TIMESTAMPTZ NOT NULL,
  slot_end_at TIMESTAMPTZ NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  notes TEXT,
  status public.booking_status NOT NULL DEFAULT 'pending',
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  amount_paid_pence INTEGER,
  pending_expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '30 minutes'),
  confirmed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Slot lock: only one active (pending or confirmed) booking per slot_start_at
CREATE UNIQUE INDEX bookings_active_slot_unique
  ON public.bookings (slot_start_at)
  WHERE status IN ('pending', 'confirmed');

CREATE INDEX bookings_slot_start_idx ON public.bookings (slot_start_at);
CREATE INDEX bookings_status_idx ON public.bookings (status);
CREATE INDEX bookings_pending_expires_idx ON public.bookings (pending_expires_at) WHERE status = 'pending';

-- Grants
GRANT INSERT ON public.bookings TO anon, authenticated;
GRANT ALL ON public.bookings TO service_role;

-- RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Guests can create a pending booking; server enforces price/status/session integrity later.
CREATE POLICY "Anyone can create a booking"
  ON public.bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'pending'
    AND stripe_session_id IS NULL
    AND stripe_payment_intent_id IS NULL
    AND amount_paid_pence IS NULL
    AND confirmed_at IS NULL
    AND cancelled_at IS NULL
    AND slot_start_at > now()
  );

-- No SELECT/UPDATE/DELETE policies: browser cannot read or modify bookings.
-- Edge functions use the service role and bypass RLS.

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER bookings_set_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Helper: expire stale pending bookings so slot frees up automatically.
CREATE OR REPLACE FUNCTION public.expire_stale_pending_bookings()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.bookings
     SET status = 'expired', cancelled_at = now()
   WHERE status = 'pending'
     AND pending_expires_at < now();
$$;

REVOKE ALL ON FUNCTION public.expire_stale_pending_bookings() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.expire_stale_pending_bookings() TO service_role;
