import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull().default(''),
  iconName: text('icon_name').notNull().default('folder'),
});

export const tools = sqliteTable('tools', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  shortDescription: text('short_description').notNull(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id),
  websiteUrl: text('website_url').notNull(),
  affiliateUrl: text('affiliate_url'),
  logoUrl: text('logo_url'),
  pricingType: text('pricing_type', {
    enum: ['free', 'freemium', 'paid', 'contact'],
  })
    .notNull()
    .default('freemium'),
  features: text('features', { mode: 'json' }).$type<string[]>().default([]),
  useCases: text('use_cases', { mode: 'json' }).$type<string[]>().default([]),
  isFeatured: integer('is_featured', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
});

export const toolTags = sqliteTable('tool_tags', {
  toolId: integer('tool_id')
    .notNull()
    .references(() => tools.id),
  tagId: integer('tag_id')
    .notNull()
    .references(() => tags.id),
});
