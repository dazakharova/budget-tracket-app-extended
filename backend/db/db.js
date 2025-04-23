import path from "path";
import pkg from 'sqlite3';
const {verbose} = pkg;

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sqlite3 = verbose();
const db = new sqlite3.Database(path.resolve(__dirname, 'database.sqlite'), (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to SQLite database');
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      type TEXT,
      description TEXT,
      amount REAL,
      category TEXT
    )
  `);
});

export default db;
