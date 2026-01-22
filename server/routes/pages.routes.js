import express from "express";
import {
  getPageBySlug,
  getSectionsByPageId,
  getBlocksBySectionId
} from "../db/index.js";

import cors from 'cors'


const router = express.Router();
router.use(cors({
  origin: 'http://localhost:5173'
}))

router.get("/:slug", (req, res, next) => {
  console.log("Fetching page with slug:", req.params.slug);
  try {
    const { slug } = req.params;

    // 1. Page
    const page = getPageBySlug(slug);
   

    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }
    console.log("Found page:", page);

    // 2. Sections
    const sections = getSectionsByPageId(page.id);

    // 3. Blocks
    for (const section of sections) {
      section.blocks = getBlocksBySectionId(section.id);
    }
    console.log("Assembled sections with blocks:", sections);

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
