import type BetterSqlite3 from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const Database = require('better-sqlite3') as typeof BetterSqlite3;
import { eq } from 'drizzle-orm';

import * as schema from '../db/schema';
import { seedCategories, seedTools } from './data';

const DB_PATH = process.env.DATABASE_URL || './local.db';

async function seed() {
  console.log('Seeding database...');

  const sqlite = new Database(DB_PATH);
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('foreign_keys = ON');

  const db = drizzle(sqlite, { schema });

  // Create tables using direct SQL statements
  const createCategoriesTable = `
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL DEFAULT '',
      icon_name TEXT NOT NULL DEFAULT 'folder'
    )`;
  sqlite.prepare(createCategoriesTable).run();

  const createToolsTable = `
    CREATE TABLE IF NOT EXISTS tools (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL,
      short_description TEXT NOT NULL,
      category_id INTEGER NOT NULL REFERENCES categories(id),
      website_url TEXT NOT NULL,
      affiliate_url TEXT,
      logo_url TEXT,
      pricing_type TEXT NOT NULL DEFAULT 'freemium',
      features TEXT DEFAULT '[]',
      use_cases TEXT DEFAULT '[]',
      is_featured INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`;
  sqlite.prepare(createToolsTable).run();

  const createTagsTable = `
    CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )`;
  sqlite.prepare(createTagsTable).run();

  const createToolTagsTable = `
    CREATE TABLE IF NOT EXISTS tool_tags (
      tool_id INTEGER NOT NULL REFERENCES tools(id),
      tag_id INTEGER NOT NULL REFERENCES tags(id),
      PRIMARY KEY (tool_id, tag_id)
    )`;
  sqlite.prepare(createToolTagsTable).run();

  // Seed categories
  console.log('  Seeding categories...');
  for (const cat of seedCategories) {
    const existing = db
      .select()
      .from(schema.categories)
      .where(eq(schema.categories.slug, cat.slug))
      .get();
    if (!existing) {
      db.insert(schema.categories).values(cat).run();
    }
  }

  // Get category map
  const allCategories = db.select().from(schema.categories).all();
  const categoryMap = new Map(allCategories.map((c) => [c.slug, c.id]));

  // Seed tools
  console.log('  Seeding tools...');
  for (const tool of seedTools) {
    const existing = db
      .select()
      .from(schema.tools)
      .where(eq(schema.tools.slug, tool.slug))
      .get();

    if (!existing) {
      const categoryId = categoryMap.get(tool.categorySlug);
      if (!categoryId) {
        console.warn(`  Warning: Category not found: ${tool.categorySlug}`);
        continue;
      }

      const now = new Date().toISOString();
      db.insert(schema.tools)
        .values({
          name: tool.name,
          slug: tool.slug,
          description: tool.description,
          shortDescription: tool.shortDescription,
          categoryId,
          websiteUrl: tool.websiteUrl,
          pricingType: tool.pricingType,
          features: tool.features,
          useCases: tool.useCases,
          isFeatured: tool.isFeatured,
          createdAt: now,
          updatedAt: now,
        })
        .run();

      // Get the inserted tool
      const inserted = db
        .select()
        .from(schema.tools)
        .where(eq(schema.tools.slug, tool.slug))
        .get();

      // Seed tags for the tool
      if (inserted) {
        for (const tagName of tool.tags) {
          let tag = db
            .select()
            .from(schema.tags)
            .where(eq(schema.tags.name, tagName))
            .get();

          if (!tag) {
            db.insert(schema.tags).values({ name: tagName }).run();
            tag = db
              .select()
              .from(schema.tags)
              .where(eq(schema.tags.name, tagName))
              .get();
          }

          if (tag) {
            db.insert(schema.toolTags)
              .values({ toolId: inserted.id, tagId: tag.id })
              .run();
          }
        }
      }
    }
  }

  const toolCount = db.select().from(schema.tools).all().length;
  const catCount = db.select().from(schema.categories).all().length;
  const tagCount = db.select().from(schema.tags).all().length;

  console.log('\nSeed complete!');
  console.log(`  Categories: ${catCount}`);
  console.log(`  Tools: ${toolCount}`);
  console.log(`  Tags: ${tagCount}`);

  sqlite.close();
}

seed().catch(console.error);
