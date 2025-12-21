import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const { default: app } = await import("./app.js");

const PORT = process.env.PORT || 4242;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});