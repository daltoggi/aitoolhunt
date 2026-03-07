import { describe, it, expect, beforeAll } from 'vitest';
import { createRequire } from 'module';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { sql } from 'drizzle-orm';

import * as schema from '../db/schema';
import { ToolService } from './tool-service';

const esmRequire = createRequire(import.meta.url);
const Database = esmRequire('better-sqlite3');

function createTestDb() {
  const sqlite = new Database(':memory:');
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('foreign_keys = ON');
  const db = drizzle(sqlite, { schema });

  // Create tables
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

  db.run(sql`CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  )`);

  db.run(sql`CREATE TABLE tool_tags (
    tool_id INTEGER NOT NULL REFERENCES tools(id),
    tag_id INTEGER NOT NULL REFERENCES tags(id),
    PRIMARY KEY (tool_id, tag_id)
  )`);

  // Seed test data
  db.run(sql`INSERT INTO categories (name, slug, description) VALUES
    ('AI Writing', 'ai-writing', 'Writing tools'),
    ('AI Image', 'ai-image', 'Image tools'),
    ('AI Coding', 'ai-coding', 'Coding tools')`);

  db.run(sql`INSERT INTO tools (name, slug, short_description, category_id, pricing_type, is_featured, website_url) VALUES
    ('ChatGPT', 'chatgpt', 'AI conversational assistant', 1, 'freemium', 1, 'https://chat.openai.com'),
    ('Jasper', 'jasper', 'AI content creation', 1, 'paid', 0, 'https://jasper.ai'),
    ('Midjourney', 'midjourney', 'AI image generator', 2, 'paid', 1, 'https://midjourney.com'),
    ('DALL-E', 'dall-e', 'OpenAI image generation', 2, 'paid', 0, 'https://openai.com/dall-e'),
    ('Cursor', 'cursor', 'AI code editor', 3, 'freemium', 1, 'https://cursor.com')`);

  db.run(sql`INSERT INTO tags (name) VALUES ('chatbot'), ('writing'), ('image'), ('coding')`);
  db.run(sql`INSERT INTO tool_tags (tool_id, tag_id) VALUES (1, 1), (1, 2), (3, 3), (5, 4)`);

  return db;
}

describe('ToolService', () => {
  let service: ToolService;

  beforeAll(() => {
    const db = createTestDb();
    service = new ToolService(db);
  });

  describe('getTools', () => {
    it('returns all tools with pagination info', async () => {
      const result = await service.getTools();
      expect(result.items).toHaveLength(5);
      expect(result.total).toBe(5);
      expect(result.page).toBe(1);
      expect(result.totalPages).toBe(1);
    });

    it('supports pagination', async () => {
      const result = await service.getTools({ pageSize: 2, page: 1 });
      expect(result.items).toHaveLength(2);
      expect(result.total).toBe(5);
      expect(result.totalPages).toBe(3);
    });

    it('filters by category', async () => {
      const result = await service.getTools({ category: 'ai-writing' });
      expect(result.items).toHaveLength(2);
      expect(result.items.every((t) => t.categorySlug === 'ai-writing')).toBe(true);
    });

    it('filters by pricing', async () => {
      const result = await service.getTools({ pricing: 'paid' });
      expect(result.items).toHaveLength(3);
      expect(result.items.every((t) => t.pricingType === 'paid')).toBe(true);
    });

    it('supports search by name', async () => {
      const result = await service.getTools({ search: 'ChatGPT' });
      expect(result.items).toHaveLength(1);
      expect(result.items[0].name).toBe('ChatGPT');
    });

    it('supports search by description', async () => {
      const result = await service.getTools({ search: 'image' });
      expect(result.items.length).toBeGreaterThanOrEqual(1);
    });

    it('sorts by name', async () => {
      const result = await service.getTools({ sort: 'name' });
      const names = result.items.map((t) => t.name);
      expect(names).toEqual([...names].sort());
    });

    it('sorts by featured', async () => {
      const result = await service.getTools({ sort: 'featured' });
      expect(result.items[0].isFeatured).toBe(true);
    });
  });

  describe('getToolBySlug', () => {
    it('returns tool with category and tags', async () => {
      const tool = await service.getToolBySlug('chatgpt');
      expect(tool).not.toBeNull();
      expect(tool!.name).toBe('ChatGPT');
      expect(tool!.category.slug).toBe('ai-writing');
      expect(tool!.tags).toContain('chatbot');
      expect(tool!.tags).toContain('writing');
    });

    it('returns null for non-existent slug', async () => {
      const tool = await service.getToolBySlug('nonexistent');
      expect(tool).toBeNull();
    });
  });

  describe('getRelatedTools', () => {
    it('returns tools from same category excluding current', async () => {
      const related = await service.getRelatedTools(1, 1); // ChatGPT, AI Writing
      expect(related).toHaveLength(1);
      expect(related[0].name).toBe('Jasper');
    });
  });

  describe('getFeaturedTools', () => {
    it('returns only featured tools', async () => {
      const featured = await service.getFeaturedTools();
      expect(featured.length).toBe(3);
      expect(featured.every((t) => t.isFeatured)).toBe(true);
    });

    it('respects limit', async () => {
      const featured = await service.getFeaturedTools(2);
      expect(featured).toHaveLength(2);
    });
  });

  describe('getToolSlugs', () => {
    it('returns all slugs', async () => {
      const slugs = await service.getToolSlugs();
      expect(slugs).toHaveLength(5);
      expect(slugs.map((s) => s.slug)).toContain('chatgpt');
    });
  });
});
