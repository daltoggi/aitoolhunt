import { describe, it, expect, beforeAll } from 'vitest';
import { createRequire } from 'module';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sql } from 'drizzle-orm';

import * as schema from '../db/schema';
import { CategoryService } from './category-service';

const esmRequire = createRequire(import.meta.url);
const Database = esmRequire('better-sqlite3');

function createTestDb() {
  const sqlite = new Database(':memory:');
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('foreign_keys = ON');
  const db = drizzle(sqlite, { schema });

  db.run(sql`CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL DEFAULT '',
    icon_name TEXT NOT NULL DEFAULT 'folder'
  )`);

  db.run(sql`CREATE TABLE tools (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL DEFAULT '',
    short_description TEXT NOT NULL DEFAULT '',
    category_id INTEGER NOT NULL REFERENCES categories(id),
    website_url TEXT NOT NULL DEFAULT '',
    affiliate_url TEXT,
    logo_url TEXT,
    pricing_type TEXT NOT NULL DEFAULT 'free',
    features TEXT NOT NULL DEFAULT '[]',
    use_cases TEXT NOT NULL DEFAULT '[]',
    is_featured INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`);

  db.run(sql`INSERT INTO categories (name, slug, description) VALUES
    ('AI Writing', 'ai-writing', 'Writing tools'),
    ('AI Image', 'ai-image', 'Image tools'),
    ('AI Coding', 'ai-coding', 'Coding tools')`);

  db.run(sql`INSERT INTO tools (name, slug, short_description, category_id, pricing_type, website_url) VALUES
    ('ChatGPT', 'chatgpt', 'AI assistant', 1, 'freemium', 'https://chat.openai.com'),
    ('Jasper', 'jasper', 'Content tool', 1, 'paid', 'https://jasper.ai'),
    ('Midjourney', 'midjourney', 'Image gen', 2, 'paid', 'https://midjourney.com')`);

  return db;
}

describe('CategoryService', () => {
  let service: CategoryService;

  beforeAll(() => {
    const db = createTestDb();
    service = new CategoryService(db);
  });

  describe('getCategories', () => {
    it('returns all categories with tool counts', async () => {
      const categories = await service.getCategories();
      expect(categories).toHaveLength(3);

      const writing = categories.find((c) => c.slug === 'ai-writing');
      expect(writing).toBeDefined();
      expect(writing!.toolCount).toBe(2);

      const image = categories.find((c) => c.slug === 'ai-image');
      expect(image!.toolCount).toBe(1);

      const coding = categories.find((c) => c.slug === 'ai-coding');
      expect(coding!.toolCount).toBe(0);
    });
  });

  describe('getCategoryBySlug', () => {
    it('returns category with tool count', async () => {
      const cat = await service.getCategoryBySlug('ai-writing');
      expect(cat).not.toBeNull();
      expect(cat!.name).toBe('AI Writing');
      expect(cat!.toolCount).toBe(2);
    });

    it('returns null for non-existent slug', async () => {
      const cat = await service.getCategoryBySlug('nonexistent');
      expect(cat).toBeNull();
    });
  });

  describe('getCategorySlugs', () => {
    it('returns all slugs', async () => {
      const slugs = await service.getCategorySlugs();
      expect(slugs).toHaveLength(3);
      expect(slugs.map((s) => s.slug)).toContain('ai-writing');
      expect(slugs.map((s) => s.slug)).toContain('ai-image');
    });
  });
});
