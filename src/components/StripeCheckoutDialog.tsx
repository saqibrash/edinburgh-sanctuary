import { useCallback } from "react";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";

interface Props {
  clientSecret: string;
  onClose: () => void;
}

export function StripeCheckoutDialog({ clientSecret, onClose }: Props) {
  const fetchClientSecret = useCallback(() => Promise.resolve(clientSecret), [clientSecret]);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-ink/70 backdrop-blur-sm overflow-y-auto p-4 md:p-8">
      <div className="relative w-full max-w-2xl bg-cream rounded-lg shadow-2xl my-4">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-ink text-cream text-lg shadow-lg hover:scale-105 transition-transform"
          aria-label="Close checkout"
        >
          ×
        </button>
        <div className="p-2 md:p-4">
          <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </div>
    </div>
  );
}
