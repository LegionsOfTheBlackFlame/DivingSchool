import { pages } from "../../data/pages.js";

export default function handler(req, res) {
  const { slug } = req.query;
  const page = pages[slug];
  console.log('API REQUEST FOR PAGE:', slug, 'FOUND:', !!page)

  if (!page) {
    return res.status(404).json({ error: "Page not found" });
  }

  return res.status(200).json(page);
}
