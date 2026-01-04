import express from "express";
import { get, query } from "../db/index.js";

const router = express.Router();

/**
 * GET /api/pages/:slug
 */
router.get("/:slug", async (req, res, next) => {
  try {
    const { slug } = req.params;

    const page = await get(
      "SELECT id, slug, title FROM pages WHERE slug = ?",
      [slug]
    );

    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    const sections = await query(
      "SELECT id, key, order_index FROM sections WHERE page_id = ? ORDER BY order_index",
      [page.id]
    );

    for (const section of sections) {
      section.blocks = await query(
        `SELECT id, type, content, lang, order_index
         FROM blocks
         WHERE section_id = ?`,
        [section.id]
      );
    }

    res.json({
      page,
      sections,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
