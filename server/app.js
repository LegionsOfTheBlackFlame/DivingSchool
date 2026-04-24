import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import pagesRouter from "./routes/pages.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get(["/", "/home", "/booking"], (req, res) => {
  res.sendFile(path.join(__dirname, "../client-react/index.html"));
});

app.use("/api/pages", pagesRouter);

app.get(/\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client-react/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
