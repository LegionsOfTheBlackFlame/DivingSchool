import express from "express";
import { query } from "../db/index.js";

const router = express.Router();

/**
 * GET /api/content/sections
 */
router.get("/sections", async (req, res, next) => {
  try {
    const sections = await query(
      "SELECT * FROM sections , order_index"
    );
    res.json(sections);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/content/blocks
 */
router.get("/blocks", async (req, res, next) => {
  try {
    const blocks = await query(
      "SELECT * FROM blocks , order_index"
    );
    res.json(blocks);
  } catch (err) {
    next(err);
  }
});

export default router;
