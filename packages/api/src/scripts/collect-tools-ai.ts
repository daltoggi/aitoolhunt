/**
 * AI Tool Collector
 * Uses OpenAI API to generate profiles for known AI tools and insert into DB.
 * Run: cd packages/web && OPENAI_API_KEY=sk-... npx tsx ../api/src/scripts/collect-tools-ai.ts
 */

import { createRequire } from 'module';
import { resolve } from 'path';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';
import OpenAI from 'openai';
import type BetterSqlite3 from 'better-sqlite3';
import * as schema from '../db/schema.js';

const esmRequire = createRequire(import.meta.url);
const Database = esmRequire('better-sqlite3') as typeof BetterSqlite3;

// ─── DB Setup ─────────────────────────────────────────────────────────────────

const dbPath = resolve(process.cwd(), 'local.db');
const sqlite = new Database(dbPath) as BetterSqlite3.Database;
sqlite.pragma('journal_mode = WAL');
sqlite.pragma('foreign_keys = ON');
const db = drizzle(sqlite, { schema });

// ─── OpenAI Setup ─────────────────────────────────────────────────────────────

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('❌ OPENAI_API_KEY environment variable not set');
  process.exit(1);
}
const openai = new OpenAI({ apiKey });

// ─── Tool Input List ──────────────────────────────────────────────────────────

interface ToolInput {
  name: string;
  websiteUrl: string;
  categorySlug: string;
}

const TOOLS_TO_COLLECT: ToolInput[] = [
  // AI Writing
  { name: 'Rytr', websiteUrl: 'https://rytr.me', categorySlug: 'ai-writing' },
  { name: 'QuillBot', websiteUrl: 'https://quillbot.com', categorySlug: 'ai-writing' },
  { name: 'Wordtune', websiteUrl: 'https://www.wordtune.com', categorySlug: 'ai-writing' },
  { name: 'Anyword', websiteUrl: 'https://anyword.com', categorySlug: 'ai-writing' },
  { name: 'Simplified', websiteUrl: 'https://simplified.com', categorySlug: 'ai-writing' },
  { name: 'Frase', websiteUrl: 'https://www.frase.io', categorySlug: 'ai-writing' },
  { name: 'Hypotenuse AI', websiteUrl: 'https://www.hypotenuse.ai', categorySlug: 'ai-writing' },
  { name: 'Article Forge', websiteUrl: 'https://www.articleforge.com', categorySlug: 'ai-writing' },
  { name: 'LongShot AI', websiteUrl: 'https://www.longshot.ai', categorySlug: 'ai-writing' },
  { name: 'TextCortex', websiteUrl: 'https://textcortex.com', categorySlug: 'ai-writing' },
  { name: 'Narrato', websiteUrl: 'https://narrato.io', categorySlug: 'ai-writing' },

  // AI Image
  { name: 'NightCafe', websiteUrl: 'https://nightcafe.studio', categorySlug: 'ai-image' },
  { name: 'Leonardo AI', websiteUrl: 'https://leonardo.ai', categorySlug: 'ai-image' },
  { name: 'Ideogram', websiteUrl: 'https://ideogram.ai', categorySlug: 'ai-image' },
  { name: 'Playground AI', websiteUrl: 'https://playgroundai.com', categorySlug: 'ai-image' },
  { name: 'Lexica', websiteUrl: 'https://lexica.art', categorySlug: 'ai-image' },
  { name: 'Artbreeder', websiteUrl: 'https://www.artbreeder.com', categorySlug: 'ai-image' },
  { name: 'Remove.bg', websiteUrl: 'https://www.remove.bg', categorySlug: 'ai-image' },
  { name: 'Clipdrop', websiteUrl: 'https://clipdrop.co', categorySlug: 'ai-image' },
  { name: 'BlueWillow', websiteUrl: 'https://www.bluewillow.ai', categorySlug: 'ai-image' },
  { name: 'GetIMG', websiteUrl: 'https://getimg.ai', categorySlug: 'ai-image' },
  { name: 'Luminar AI', websiteUrl: 'https://skylum.com/luminar-ai', categorySlug: 'ai-image' },

  // AI Video
  { name: 'InVideo', websiteUrl: 'https://invideo.io', categorySlug: 'ai-video' },
  { name: 'Pictory', websiteUrl: 'https://pictory.ai', categorySlug: 'ai-video' },
  { name: 'Lumen5', websiteUrl: 'https://lumen5.com', categorySlug: 'ai-video' },
  { name: 'Steve AI', websiteUrl: 'https://www.steve.ai', categorySlug: 'ai-video' },
  { name: 'Fliki', websiteUrl: 'https://fliki.ai', categorySlug: 'ai-video' },
  { name: 'Wisecut', websiteUrl: 'https://www.wisecut.video', categorySlug: 'ai-video' },
  { name: 'Captions AI', websiteUrl: 'https://www.captions.ai', categorySlug: 'ai-video' },
  { name: 'Kling AI', websiteUrl: 'https://klingai.com', categorySlug: 'ai-video' },
  { name: 'Veed.io', websiteUrl: 'https://www.veed.io', categorySlug: 'ai-video' },
  { name: 'FlexClip', websiteUrl: 'https://www.flexclip.com', categorySlug: 'ai-video' },

  // AI Coding
  { name: 'Phind', websiteUrl: 'https://www.phind.com', categorySlug: 'ai-coding' },
  { name: 'Blackbox AI', websiteUrl: 'https://www.blackbox.ai', categorySlug: 'ai-coding' },
  { name: 'Continue', websiteUrl: 'https://continue.dev', categorySlug: 'ai-coding' },
  { name: 'Supermaven', websiteUrl: 'https://supermaven.com', categorySlug: 'ai-coding' },
  { name: 'Pieces for Developers', websiteUrl: 'https://pieces.app', categorySlug: 'ai-coding' },
  { name: 'JetBrains AI', websiteUrl: 'https://www.jetbrains.com/ai', categorySlug: 'ai-coding' },
  { name: 'CodiumAI', websiteUrl: 'https://www.codium.ai', categorySlug: 'ai-coding' },
  { name: 'Devin', websiteUrl: 'https://www.cognition.ai', categorySlug: 'ai-coding' },
  { name: 'V0 by Vercel', websiteUrl: 'https://v0.dev', categorySlug: 'ai-coding' },

  // AI Voice
  { name: 'Speechify', websiteUrl: 'https://speechify.com', categorySlug: 'ai-voice' },
  { name: 'Play.ht', websiteUrl: 'https://play.ht', categorySlug: 'ai-voice' },
  { name: 'Lovo AI', websiteUrl: 'https://lovo.ai', categorySlug: 'ai-voice' },
  { name: 'Podcastle', websiteUrl: 'https://podcastle.ai', categorySlug: 'ai-voice' },
  { name: 'Resemble AI', websiteUrl: 'https://www.resemble.ai', categorySlug: 'ai-voice' },
  { name: 'Cleanvoice', websiteUrl: 'https://cleanvoice.ai', categorySlug: 'ai-voice' },
  { name: 'Krisp', websiteUrl: 'https://krisp.ai', categorySlug: 'ai-voice' },
  { name: 'Adobe Podcast', websiteUrl: 'https://podcast.adobe.com', categorySlug: 'ai-voice' },
  { name: 'Riverside', websiteUrl: 'https://riverside.fm', categorySlug: 'ai-voice' },

  // AI Marketing
  { name: 'MarketMuse', websiteUrl: 'https://www.marketmuse.com', categorySlug: 'ai-marketing' },
  { name: 'Clearscope', websiteUrl: 'https://www.clearscope.io', categorySlug: 'ai-marketing' },
  { name: 'GrowthBar', websiteUrl: 'https://www.growthbarseo.com', categorySlug: 'ai-marketing' },
  { name: 'Smartwriter', websiteUrl: 'https://www.smartwriter.ai', categorySlug: 'ai-marketing' },
  { name: 'Persado', websiteUrl: 'https://www.persado.com', categorySlug: 'ai-marketing' },
  { name: 'Albert AI', websiteUrl: 'https://albert.ai', categorySlug: 'ai-marketing' },
  { name: 'Writerly', websiteUrl: 'https://writerly.ai', categorySlug: 'ai-marketing' },
  { name: 'Alli AI', websiteUrl: 'https://www.alliai.com', categorySlug: 'ai-marketing' },
  { name: 'Phrasee', websiteUrl: 'https://phrasee.co', categorySlug: 'ai-marketing' },

  // AI Research
  { name: 'ChatPDF', websiteUrl: 'https://www.chatpdf.com', categorySlug: 'ai-research' },
  { name: 'Explainpaper', websiteUrl: 'https://www.explainpaper.com', categorySlug: 'ai-research' },
  {
    name: 'Connected Papers',
    websiteUrl: 'https://www.connectedpapers.com',
    categorySlug: 'ai-research',
  },
  { name: 'SciSummary', websiteUrl: 'https://scisummary.com', categorySlug: 'ai-research' },
  { name: 'Genei', websiteUrl: 'https://www.genei.io', categorySlug: 'ai-research' },
  { name: 'Undermind', websiteUrl: 'https://www.undermind.ai', categorySlug: 'ai-research' },
  { name: 'Litmaps', websiteUrl: 'https://www.litmaps.com', categorySlug: 'ai-research' },
  { name: 'Humata', websiteUrl: 'https://www.humata.ai', categorySlug: 'ai-research' },

  // AI Design
  { name: 'Uizard', websiteUrl: 'https://uizard.io', categorySlug: 'ai-design' },
  { name: 'Galileo AI', websiteUrl: 'https://www.usegalileo.ai', categorySlug: 'ai-design' },
  { name: 'Locofy', websiteUrl: 'https://www.locofy.ai', categorySlug: 'ai-design' },
  { name: 'Visily', websiteUrl: 'https://www.visily.ai', categorySlug: 'ai-design' },
  { name: 'Khroma', websiteUrl: 'https://www.khroma.co', categorySlug: 'ai-design' },
  { name: 'Designs AI', websiteUrl: 'https://designs.ai', categorySlug: 'ai-design' },
  { name: 'Brandmark', websiteUrl: 'https://brandmark.io', categorySlug: 'ai-design' },
  { name: 'Patterned AI', websiteUrl: 'https://www.patterned.ai', categorySlug: 'ai-design' },
  { name: 'Colormind', websiteUrl: 'http://colormind.io', categorySlug: 'ai-design' },

  // AI Chatbot
  { name: 'Intercom Fin', websiteUrl: 'https://www.intercom.com', categorySlug: 'ai-chatbot' },
  { name: 'Tidio', websiteUrl: 'https://www.tidio.com', categorySlug: 'ai-chatbot' },
  { name: 'ManyChat', websiteUrl: 'https://manychat.com', categorySlug: 'ai-chatbot' },
  { name: 'Chatbase', websiteUrl: 'https://www.chatbase.co', categorySlug: 'ai-chatbot' },
  { name: 'Botpress', websiteUrl: 'https://botpress.com', categorySlug: 'ai-chatbot' },
  { name: 'Voiceflow', websiteUrl: 'https://www.voiceflow.com', categorySlug: 'ai-chatbot' },
  { name: 'Landbot', websiteUrl: 'https://landbot.io', categorySlug: 'ai-chatbot' },
  { name: 'Ada Support', websiteUrl: 'https://www.ada.cx', categorySlug: 'ai-chatbot' },
  { name: 'Drift AI', websiteUrl: 'https://www.drift.com', categorySlug: 'ai-chatbot' },
  { name: 'CustomGPT', websiteUrl: 'https://customgpt.ai', categorySlug: 'ai-chatbot' },

  // AI Productivity
  { name: 'Mem AI', websiteUrl: 'https://mem.ai', categorySlug: 'ai-productivity' },
  { name: 'Motion', websiteUrl: 'https://www.usemotion.com', categorySlug: 'ai-productivity' },
  {
    name: 'Clockwise',
    websiteUrl: 'https://www.getclockwise.com',
    categorySlug: 'ai-productivity',
  },
  { name: 'Superhuman', websiteUrl: 'https://superhuman.com', categorySlug: 'ai-productivity' },
  { name: 'Tactiq', websiteUrl: 'https://tactiq.io', categorySlug: 'ai-productivity' },
  { name: 'Grain', websiteUrl: 'https://grain.com', categorySlug: 'ai-productivity' },
  { name: 'Magical', websiteUrl: 'https://www.getmagical.com', categorySlug: 'ai-productivity' },
  { name: 'Rows AI', websiteUrl: 'https://rows.com', categorySlug: 'ai-productivity' },
  { name: 'Taskade AI', websiteUrl: 'https://www.taskade.com', categorySlug: 'ai-productivity' },
];

// ─── OpenAI Profile Generator ─────────────────────────────────────────────────

interface ToolProfile {
  shortDescription: string;
  description: string;
  pricingType: 'free' | 'freemium' | 'paid';
  features: string[];
  useCases: string[];
  tags: string[];
}

async function generateToolProfile(tool: ToolInput): Promise<ToolProfile> {
  const prompt = `You are an expert on AI tools. Generate a factual profile for "${tool.name}" (${tool.websiteUrl}).

Respond with ONLY valid JSON (no markdown, no code blocks):
{
  "shortDescription": "one sentence max 100 chars describing what it does",
  "description": "2-3 sentences about the tool its main purpose and who it is for",
  "pricingType": "freemium",
  "features": ["feature1", "feature2", "feature3", "feature4", "feature5"],
  "useCases": ["use case 1", "use case 2", "use case 3", "use case 4"],
  "tags": ["tag1", "tag2", "tag3", "tag4"]
}

Rules:
- shortDescription: concise factual max 100 chars
- description: 2-3 sentences informative
- pricingType: exactly one of free freemium paid
- features: array of 5 short phrases
- useCases: array of 4 short noun phrases
- tags: array of 4 lowercase hyphenated tags`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
    max_tokens: 400,
  });

  const content = response.choices[0].message.content?.trim() ?? '{}';
  return JSON.parse(content) as ToolProfile;
}

// ─── Slug Generator ───────────────────────────────────────────────────────────

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// ─── DB Helpers (synchronous, matching seed pattern) ──────────────────────────

function getCategoryId(slug: string): number | null {
  const cat = db.select().from(schema.categories).where(eq(schema.categories.slug, slug)).get();
  return cat?.id ?? null;
}

function toolExists(slug: string): boolean {
  const tool = db.select().from(schema.tools).where(eq(schema.tools.slug, slug)).get();
  return !!tool;
}

function insertToolWithTags(tool: ToolInput, profile: ToolProfile, categoryId: number): void {
  const slug = toSlug(tool.name);
  const now = new Date().toISOString();

  // Insert tool using drizzle synchronous .run()
  db.insert(schema.tools)
    .values({
      name: tool.name,
      slug,
      description: profile.description,
      shortDescription: profile.shortDescription,
      categoryId,
      websiteUrl: tool.websiteUrl,
      pricingType: profile.pricingType,
      features: profile.features,
      useCases: profile.useCases,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    })
    .run();

  const inserted = db.select().from(schema.tools).where(eq(schema.tools.slug, slug)).get();
  if (!inserted) return;

  // Insert tags using raw SQL for tool_tags (avoids onConflictDoNothing issues)
  for (const tagName of profile.tags) {
    let tag = db.select().from(schema.tags).where(eq(schema.tags.name, tagName)).get();
    if (!tag) {
      db.insert(schema.tags).values({ name: tagName }).run();
      tag = db.select().from(schema.tags).where(eq(schema.tags.name, tagName)).get();
    }
    if (tag) {
      sqlite
        .prepare('INSERT OR IGNORE INTO tool_tags (tool_id, tag_id) VALUES (?, ?)')
        .run(inserted.id, tag.id);
    }
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log(`🚀 AI Tool Collector — ${TOOLS_TO_COLLECT.length} tools to process`);
  console.log(`📁 DB: ${dbPath}\n`);

  let added = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < TOOLS_TO_COLLECT.length; i++) {
    const tool = TOOLS_TO_COLLECT[i];
    const slug = toSlug(tool.name);
    const p = `[${String(i + 1).padStart(3)}/${TOOLS_TO_COLLECT.length}]`;

    if (toolExists(slug)) {
      console.log(`${p} ⏭️  ${tool.name}`);
      skipped++;
      continue;
    }

    const categoryId = getCategoryId(tool.categorySlug);
    if (!categoryId) {
      console.log(`${p} ❌ Category not found: ${tool.categorySlug}`);
      failed++;
      continue;
    }

    try {
      process.stdout.write(`${p} 🤖 ${tool.name}... `);
      const profile = await generateToolProfile(tool);
      insertToolWithTags(tool, profile, categoryId);
      console.log(`✅ ${profile.pricingType}`);
      added++;
      if (i < TOOLS_TO_COLLECT.length - 1) await sleep(200);
    } catch (err) {
      console.log(`❌ ${err instanceof Error ? err.message : String(err)}`);
      failed++;
    }
  }

  console.log(`\n📊 Results:`);
  console.log(`   ✅ Added: ${added}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Failed: ${failed}`);

  sqlite.close();
}

main().catch((err) => {
  console.error('Fatal:', err);
  sqlite.close();
  process.exit(1);
});
