import express from "express";
import cors from "cors";
import { getPage } from "../data/getPage.js";

const router = express.Router();

router.use(cors({
  origin: "http://localhost:5173"
}));

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const page = await getPage(slug);

  if (!page) {
    return res.status(404).json({ error: "Page not found" });
  }

  res.json(page);
});

export default router;