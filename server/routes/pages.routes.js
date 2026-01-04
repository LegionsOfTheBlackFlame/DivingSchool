import express from "express";
import {
  getPageBySlug,
  getSectionsByPageId,
  getBlocksBySectionId
} from "../db/index.js";

const router = express.Router();

/**
 * GET /api/pages/:slug
 */
router.get("/:slug", (req, res, next) => {
  try {
    const { slug } = req.params;

    // 1. Page
    const page = getPageBySlug(slug);

    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    // 2. Sections
    const sections = getSectionsByPageId(page.id);

    // 3. Blocks
    for (const section of sections) {
      section.blocks = getBlocksBySectionId(section.id);
    }

    // 4. Response shape frontend expects
    res.json({
      ...page,
      sections
    });

  } catch (err) {
    next(err);
  }
});

export default router;
