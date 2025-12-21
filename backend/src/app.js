import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/payment.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/payments", paymentRoutes);



export default app;
