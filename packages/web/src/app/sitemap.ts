import type { MetadataRoute } from 'next';
import { SITE_URL } from '@aitoolhunt/shared';
import { getToolService, getCategoryService } from '@/lib/db';

// Generated at build time
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const toolService = getToolService();
  const categoryService = getCategoryService();

  const [toolSlugs, categorySlugs] = await Promise.all([
    toolService.getToolSlugs(),
    categoryService.getCategorySlugs(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const toolPages: MetadataRoute.Sitemap = toolSlugs.map(({ slug }) => ({
    url: `${SITE_URL}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const categoryPages: MetadataRoute.Sitemap = categorySlugs.map(({ slug }) => ({
    url: `${SITE_URL}/categories/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...toolPages, ...categoryPages];
}
