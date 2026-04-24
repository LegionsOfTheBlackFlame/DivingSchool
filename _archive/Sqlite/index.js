import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// db.sqlite is in /server
const dbPath = path.join(__dirname, '../db.sqlite');

const db = new Database(dbPath);

export default db;

export function getPageBySlug(slug) {
  const page = db
    .prepare('SELECT * FROM pages WHERE slug = ?')
    .get(slug);

  return page;
}

export function getSectionsByPageId(pageId) {
 
  return db
    .prepare('SELECT * FROM sections WHERE page_id = ? ORDER BY order_index')
    .all(pageId);
}

export function getBlocksBySectionId(sectionId) {
  console.log("Getting blocks for section ID:", sectionId);
  return db
    .prepare('SELECT * FROM blocks WHERE section_id = ? ORDER BY order_index')
    .all(sectionId);
}

export function getAllSections() {
  return db
    .prepare('SELECT * FROM sections ORDER BY order_index')
    .all();
}

export function getAllBlocks() {
  console.log("Fetching all content blocks from the database");
  return db
    .prepare('SELECT * FROM content_blocks ORDER BY order_index')
    .all();
}

export function insertContactMessage({ email, message }) {
  const stmt = db.prepare(`
    INSERT INTO contact_messages ( email, message)
    VALUES (?, ?)
  `);

  return stmt.run(email, message);
}