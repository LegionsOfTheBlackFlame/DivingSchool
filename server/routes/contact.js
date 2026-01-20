import express from "express";
import cors from "cors";
import { insertContactMessage } from "../db/index.js";

const router = express.Router();

router.use(cors({
  origin: "http://localhost:5173"
}));

router.post("/", (req, res) => {
  const {email, message } = req.body;
  console.log(req.body);

  if (!!email || !!message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    insertContactMessage({email, message });
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
