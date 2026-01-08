import express from "express";
import {
  getAllSections,
  getAllBlocks
} from "../db/index.js";
import cors from 'cors'


const router = express.Router();
router.use(cors({
  origin: 'http://localhost:5173'
}))

/**
 * GET /api/content/sections
 */
router.get("/sections", (req, res, next) => {
  try {
    const sections = getAllSections();
    res.json(sections);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/content/blocks
 */
router.get("/blocks", (req, res, next) => {
  try {
    const blocks = getAllBlocks();
    res.json(blocks);
  } catch (err) {
    next(err);
  }
});

export default router;
