import sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.resolve("server/db.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to SQLite DB", err);
  } else {
    console.log("Connected to SQLite DB");
  }
});

export default db;