import { eq, count } from 'drizzle-orm';

import type { DbClient } from '../db/client';
import { categories, tools } from '../db/schema';

export class CategoryService {
  constructor(private db: DbClient) {}

  async getCategories() {
    const cats = this.db.select().from(categories).all();

    const countsResult = this.db
      .select({
        categoryId: tools.categoryId,
        count: count(),
      })
      .from(tools)
      .groupBy(tools.categoryId)
      .all();

    const countMap = new Map(countsResult.map((c) => [c.categoryId, c.count]));

    return cats.map((cat) => ({
      ...cat,
      toolCount: countMap.get(cat.id) || 0,
    }));
  }

  async getCategoryBySlug(slug: string) {
    const category = this.db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug))
      .get();

    if (!category) return null;

    const [toolCount] = this.db
      .select({ count: count() })
      .from(tools)
      .where(eq(tools.categoryId, category.id))
      .all();

    return {
      ...category,
      toolCount: toolCount?.count || 0,
    };
  }

  async getCategorySlugs() {
    return this.db
      .select({ slug: categories.slug })
      .from(categories)
      .all();
  }
}
