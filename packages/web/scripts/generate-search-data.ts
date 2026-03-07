/**
 * Generate static JSON data for client-side search.
 * Runs before `next build` to create public/data/tools.json.
 * Uses direct SQLite access (not @aitoolhunt/api) for ESM compatibility.
 */
import { createRequire } from 'module';
import { resolve } from 'path';
import fs from 'fs';

const esmRequire = createRequire(import.meta.url);
const Database = esmRequire('better-sqlite3');

const dbPath = resolve(process.cwd(), 'local.db');
const sqlite = new Database(dbPath);
sqlite.pragma('journal_mode = WAL');

interface ToolRow {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  pricingType: string;
  isFeatured: number;
  logoUrl: string | null;
  categoryName: string | null;
  categorySlug: string | null;
}

const tools = (sqlite
  .prepare(
    `SELECT t.id, t.name, t.slug, t.short_description as shortDescription,
            t.pricing_type as pricingType, t.is_featured as isFeatured, t.logo_url as logoUrl,
            c.name as categoryName, c.slug as categorySlug
     FROM tools t
     LEFT JOIN categories c ON t.category_id = c.id
     ORDER BY t.created_at DESC`,
  )
  .all() as ToolRow[]).map((row) => ({
  ...row,
  isFeatured: Boolean(row.isFeatured),
  categoryName: row.categoryName || '',
  categorySlug: row.categorySlug || '',
}));

const categories = sqlite
  .prepare(
    `SELECT c.id, c.name, c.slug, c.description, c.icon_name as iconName,
            COUNT(t.id) as toolCount
     FROM categories c
     LEFT JOIN tools t ON c.id = t.category_id
     GROUP BY c.id
     ORDER BY c.name`,
  )
  .all();

const data = { tools, categories, generatedAt: new Date().toISOString() };

const outDir = resolve(process.cwd(), 'public/data');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(resolve(outDir, 'tools.json'), JSON.stringify(data));

console.log(`Generated search data: ${tools.length} tools, ${categories.length} categories`);
sqlite.close();
