import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";

// --- resolve __dirname for ESM ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- absolute paths (CRITICAL) ---
const DB_PATH = path.join(__dirname, "../db.sqlite");
const SCHEMA_PATH = path.join(__dirname, "../db/schema.sql");
const SEED_PATH = path.join(__dirname, "../db/seed.sql");

console.log("Initializing database…");

// ensure directory exists
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

// open db
const db = new Database(DB_PATH);

// --- schema ---
const schema = fs.readFileSync(SCHEMA_PATH, "utf8");
db.exec(schema);
console.log("✓ Schema applied");

// --- seed ---
if (fs.existsSync(SEED_PATH)) {
  const seed = fs.readFileSync(SEED_PATH, "utf8");

  // split on semicolons safely
  const statements = seed
    .split(";")
    .map(s => s.trim())
    .filter(Boolean);

  const insert = db.transaction(() => {
    for (const stmt of statements) {
      db.prepare(stmt).run();
    }
  });

  insert();
  console.log("✓ Seed data inserted");
}

db.close();
console.log("Database ready.");
