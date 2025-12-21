import stripe from "../config/stripe.js";

export const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "usd",
    automatic_payment_methods: { enabled: true }
  });

  res.json({ clientSecret: paymentIntent.client_secret });
};
