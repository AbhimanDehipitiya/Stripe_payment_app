export const createPaymentIntent = async (amount) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/payments/create-payment-intent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount })
    }
  );
  return res.json();
};
