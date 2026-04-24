import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve('./db/db.sqlite');

const db = new Database(dbPath, {
  verbose: console.log
});

export default db;