import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

const DB_PATH = process.env.DATABASE_URL || './local.db';

export function runMigrations() {
  const sqlite = new Database(DB_PATH);
  const db = drizzle(sqlite);
  migrate(db, { migrationsFolder: './drizzle' });
  sqlite.close();
  console.log('Migrations completed successfully');
}
