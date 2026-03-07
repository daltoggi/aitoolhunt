import { eq, like, and, desc, asc, sql, count } from 'drizzle-orm';

import type { DbClient } from '../db/client';
import { tools, categories, tags, toolTags } from '../db/schema';
import type { ToolsQueryParams, PricingType } from '@aitoolhunt/shared';
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '@aitoolhunt/shared';

export class ToolService {
  constructor(private db: DbClient) {}

  async getTools(params: ToolsQueryParams = {}) {
    const page = Math.max(1, params.page || 1);
    const pageSize = Math.min(Math.max(1, params.pageSize || DEFAULT_PAGE_SIZE), MAX_PAGE_SIZE);
    const offset = (page - 1) * pageSize;

    const conditions = [];

    if (params.category) {
      const cat = this.db
        .select({ id: categories.id })
        .from(categories)
        .where(eq(categories.slug, params.category))
        .get();
      if (cat) {
        conditions.push(eq(tools.categoryId, cat.id));
      }
    }

    if (params.pricing) {
      conditions.push(eq(tools.pricingType, params.pricing as PricingType));
    }

    if (params.search) {
      const searchTerm = `%${params.search}%`;
      conditions.push(
        sql`(${tools.name} LIKE ${searchTerm} OR ${tools.shortDescription} LIKE ${searchTerm})`,
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    let orderBy;
    switch (params.sort) {
      case 'name':
        orderBy = asc(tools.name);
        break;
      case 'featured':
        orderBy = desc(tools.isFeatured);
        break;
      case 'newest':
      default:
        orderBy = desc(tools.createdAt);
    }

    const [items, totalResult] = await Promise.all([
      this.db
        .select({
          id: tools.id,
          name: tools.name,
          slug: tools.slug,
          shortDescription: tools.shortDescription,
          categoryId: tools.categoryId,
          categoryName: categories.name,
          categorySlug: categories.slug,
          logoUrl: tools.logoUrl,
          pricingType: tools.pricingType,
          isFeatured: tools.isFeatured,
        })
        .from(tools)
        .leftJoin(categories, eq(tools.categoryId, categories.id))
        .where(whereClause)
        .orderBy(orderBy)
        .limit(pageSize)
        .offset(offset),
      this.db
        .select({ count: count() })
        .from(tools)
        .where(whereClause),
    ]);

    const total = totalResult[0]?.count || 0;

    return {
      items: items.map((item) => ({
        ...item,
        categoryName: item.categoryName || '',
        categorySlug: item.categorySlug || '',
        tags: [] as string[],
      })),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async getToolBySlug(slug: string) {
    const tool = this.db
      .select()
      .from(tools)
      .where(eq(tools.slug, slug))
      .get();

    if (!tool) return null;

    const category = this.db
      .select()
      .from(categories)
      .where(eq(categories.id, tool.categoryId))
      .get();

    const toolTagRows = this.db
      .select({ name: tags.name })
      .from(toolTags)
      .innerJoin(tags, eq(toolTags.tagId, tags.id))
      .where(eq(toolTags.toolId, tool.id))
      .all();

    return {
      ...tool,
      features: (tool.features as string[]) || [],
      useCases: (tool.useCases as string[]) || [],
      category: category || { id: 0, name: '', slug: '', description: '', iconName: 'folder' },
      tags: toolTagRows.map((t) => t.name),
    };
  }

  async getRelatedTools(toolId: number, categoryId: number, limit = 4) {
    return this.db
      .select({
        id: tools.id,
        name: tools.name,
        slug: tools.slug,
        shortDescription: tools.shortDescription,
        logoUrl: tools.logoUrl,
        pricingType: tools.pricingType,
      })
      .from(tools)
      .where(and(eq(tools.categoryId, categoryId), sql`${tools.id} != ${toolId}`))
      .limit(limit);
  }

  async getFeaturedTools(limit = 6) {
    return this.db
      .select({
        id: tools.id,
        name: tools.name,
        slug: tools.slug,
        shortDescription: tools.shortDescription,
        categoryId: tools.categoryId,
        categoryName: categories.name,
        categorySlug: categories.slug,
        logoUrl: tools.logoUrl,
        pricingType: tools.pricingType,
        isFeatured: tools.isFeatured,
      })
      .from(tools)
      .leftJoin(categories, eq(tools.categoryId, categories.id))
      .where(eq(tools.isFeatured, true))
      .limit(limit);
  }

  async getToolSlugs() {
    return this.db
      .select({ slug: tools.slug })
      .from(tools)
      .all();
  }
}
