
import express from 'express';
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

import pagesRouter from "./routes/pages.routes.js";
import contentRouter from "./routes/content.routes.js";
import divesRouter from "./routes/dives.js";
import bookingsRouter from "./routes/bookings.js";
import contactRouter from "./routes/contact.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get(['/', '/home', '/booking'], (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use("/api/pages", pagesRouter);
app.use("/api/content", contentRouter);
app.use("/api/dives", divesRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/contact", contactRouter);

// Catch-all
app.get(/\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});