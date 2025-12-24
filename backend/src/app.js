import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import compression from "compression";
import dotenv from "dotenv";
import paymentRoutes from "./routes/payment.routes.js";

dotenv.config();

const app = express();

// If behind a proxy (e.g., Heroku, nginx), trust first proxy
if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);

// CORS: allow explicit origins via `CORS_ORIGINS` env (comma-separated)
// const rawOrigins = process.env.CORS_ORIGINS || "";
// const allowedOrigins = rawOrigins.split(",").map(s => s.trim()).filter(Boolean);
// const corsOptions = allowedOrigins.length
// 	? {
// 			origin: (origin, callback) => {
// 				if (!origin) return callback(null, true); // allow non-browser clients or same-origin
// 				if (allowedOrigins.includes(origin)) return callback(null, true);
// 				return callback(new Error("CORS not allowed"), false);
// 			},
// 		}
// 	: undefined;

app.use(cors()); // Enable CORS for all origins (adjust as needed)

// Security headers
app.use(helmet());

// Response compression
app.use(compression());

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// Body parsing with size limit
app.use(express.json({ limit: "10kb" }));

// Logging
if (process.env.NODE_ENV === "production") {
	app.use(morgan("combined"));
} else {
	app.use(morgan("dev"));
}

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Routes
app.use("/api/payments", paymentRoutes);

// 404 handler
app.use((req, res) => {
	res.status(404).json({ error: "Not Found" });
});

// Error handler
app.use((err, req, res, next) => {
	// eslint-disable-next-line no-console
	console.error(err);
	const status = err.status || 500;
	const payload = { error: err.message || "Internal Server Error" };
	if (process.env.NODE_ENV !== "production" && err.stack) payload.stack = err.stack;
	res.status(status).json(payload);
});

export default app;
