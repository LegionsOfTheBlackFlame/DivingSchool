import { pages } from "../../data/pages.js";

export async function getPageFromMock(slug) {
  return pages[slug] || null
}