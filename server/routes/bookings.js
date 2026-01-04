import express from "express";

const router = express.Router();

/**
 * POST /api/bookings
 */
router.post("/", (req, res) => {
  const { name, email, diveId, date } = req.body;

  if (!name || !email || !diveId || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Later: persist to DB
  res.status(201).json({
    success: true,
    booking: {
      name,
      email,
      diveId,
      date,
    },
  });
});

export default router;
