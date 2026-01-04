import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

const DB_PATH = path.resolve("./db.sqlite");
const SCHEMA_PATH = path.resolve("./db/schema.sql");
const SEED_PATH = path.resolve("./db/seed.sql");

console.log("Initializing database…");

const db = new Database(DB_PATH);

// --- schema ---
const schema = fs.readFileSync(SCHEMA_PATH, "utf8");
db.exec(schema);
console.log("✓ Schema applied");

// --- seed ---
if (fs.existsSync(SEED_PATH)) {
  const seed = fs.readFileSync(SEED_PATH, "utf8");
  db.exec(seed);
  console.log("✓ Seed data inserted");
}

db.close();
console.log("Database ready.");
