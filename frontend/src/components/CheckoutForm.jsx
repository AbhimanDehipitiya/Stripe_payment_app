import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../services/payment.service";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {
      const { clientSecret } = await createPaymentIntent(10);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)
          }
        }
      );

      if (error) alert(error.message);
      else if (paymentIntent && paymentIntent.status === "succeeded")
        alert("Payment successful 🎉");
    } catch (err) {
      console.error(err);
      alert("Payment failed: " + (err.message || err));
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="border p-4 rounded-lg bg-gray-50">
        <CardElement />
      </div>

      <button
        disabled={!stripe}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
      >
        Pay $10
      </button>
    </form>
  );
}
