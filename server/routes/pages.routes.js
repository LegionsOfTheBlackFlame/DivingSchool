import express from "express";
import cors from "cors";

import { pages } from "../../data/pages.js";

const router = express.Router();

router.use(cors({
  origin: "http://localhost:5173"
}));

router.get("/:slug", (req, res) => {
  const { slug } = req.params;
  const page = pages[slug];

  if (!page) {
    return res.status(404).json({ error: "Page not found" });
  }

  res.json(page);
});

export default router;
