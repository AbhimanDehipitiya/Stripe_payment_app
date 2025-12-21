import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentIntent } =
      await stripe.confirmCardPayment(
        elements._clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)
          }
        }
      );

    if (error) alert(error.message);
    else if (paymentIntent.status === "succeeded")
      alert("Payment successful 🎉");
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
