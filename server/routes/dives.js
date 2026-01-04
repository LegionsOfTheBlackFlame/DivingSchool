import express from "express";

const router = express.Router();

/**
 * GET /api/dives
 */
router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Beginner Dive",
      depth: "10m",
      duration: "30 min",
    },
    {
      id: 2,
      name: "Advanced Reef Dive",
      depth: "30m",
      duration: "45 min",
    },
  ]);
});

export default router;
