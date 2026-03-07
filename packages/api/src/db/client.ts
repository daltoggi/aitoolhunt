import { resolve } from 'path';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import type BetterSqlite3 from 'better-sqlite3';

import * as schema from './schema';

// Use require() for better-sqlite3 because it's a native C++ addon.
// ESM import breaks in webpack dev mode (default export becomes undefined).
// eslint-disable-next-line @typescript-eslint/no-require-imports
const Database = require('better-sqlite3') as typeof BetterSqlite3;

function getDbPath(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  // In Next.js, process.cwd() is the web package root
  return resolve(process.cwd(), 'local.db');
}

let sqliteDb: BetterSqlite3.Database | null = null;

function getSqliteDb(): BetterSqlite3.Database {
  if (!sqliteDb) {
    const dbPath = getDbPath();
    sqliteDb = new Database(dbPath);
    sqliteDb.pragma('journal_mode = WAL');
    sqliteDb.pragma('foreign_keys = ON');
  }
  return sqliteDb;
}

export function getDb() {
  return drizzle(getSqliteDb(), { schema });
}

export type DbClient = ReturnType<typeof getDb>;
