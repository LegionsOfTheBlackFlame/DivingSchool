import express from "express";
import dotenv from "dotenv";
import pagesRouter from "./routes/pages.routes.js";
import contentRouter from "./routes/content.routes.js";
import divesRouter from "./routes/dives.js";
import bookingsRouter from "./routes/bookings.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/pages", pagesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});
app.use("/api/content", contentRouter);
app.use("/api/dives", divesRouter);
app.use("/api/bookings", bookingsRouter);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});