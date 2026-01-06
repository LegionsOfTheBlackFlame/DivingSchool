import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

const DB_PATH = path.resolve("./db.sqlite");

// ---- helpers ----
function fail(message) {
  console.error("❌ DB SANITY CHECK FAILED:");
  console.error("   " + message);
  process.exit(1);
}

function ok(message) {
  console.log("✓", message);
}

// ---- 1. database file ----
if (!fs.existsSync(DB_PATH)) {
  fail("Database file does not exist at ./db.sqlite");
}
ok("Database file exists");

// ---- 2. open db ----
const db = new Database(DB_PATH, { readonly: true });

// ---- 3. required tables ----
const REQUIRED_TABLES = [
  "pages",
  "sections",
  "blocks"
];

const tables = db
  .prepare(`
    SELECT name
    FROM sqlite_master
    WHERE type = 'table'
  `)
  .all()
  .map(t => t.name);

for (const table of REQUIRED_TABLES) {
  if (!tables.includes(table)) {
    fail(`Missing required table: ${table}`);
  }
  ok(`Table exists: ${table}`);
}

// ---- 4. baseline data ----
const homePage = db
  .prepare("SELECT id FROM pages WHERE slug = 'home'")
  .get();

if (!homePage) {
  fail("Missing required page with slug = 'home'");
}
ok("Home page exists");

// ---- 5. sections linked to home ----
const sections = db
  .prepare("SELECT id FROM sections WHERE page_id = ?")
  .all(homePage.id);

if (sections.length === 0) {
  fail("Home page has no sections");
}
ok(`Home page has ${sections.length} section(s)`);

// ---- 6. blocks sanity ----
const blocksCount = db
  .prepare(`
    SELECT COUNT(*) as count
    FROM blocks
  `)
  .get().count;

if (blocksCount === 0) {
  fail("No content blocks found");
}
ok(`Database has ${blocksCount} content block(s)`);

// ---- done ----
db.close();
console.log("🎉 Database sanity check passed");
process.exit(0);
