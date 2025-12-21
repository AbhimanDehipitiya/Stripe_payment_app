import { useEffect, useState } from "react";
import StripeProvider from "../components/StripeProvider";
import CheckoutForm from "../components/CheckoutForm";
import { createPaymentIntent } from "../services/payment.service";

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const loadIntent = async () => {
      const res = await createPaymentIntent(10);
      setClientSecret(res.clientSecret);
    };
    loadIntent();
  }, []);

  if (!clientSecret) {
    return <p className="text-center mt-20">Loading payment…</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">Checkout</h1>
        <p className="text-gray-500 mb-6">
          Secure payment powered by Stripe
        </p>

        {/* ⬇️ Elements mounted ONCE */}
        <StripeProvider clientSecret={clientSecret}>
          <CheckoutForm />
        </StripeProvider>
      </div>
    </div>
  );
}
