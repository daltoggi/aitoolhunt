import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getToolService, getCategoryService } from '@/lib/db';
import { ToolCard, AdSlot } from '@aitoolhunt/ui';
import { AD_SLOTS, generateCategoryTitle, generateCanonicalUrl } from '@aitoolhunt/shared';
import type { PricingType } from '@aitoolhunt/shared';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryService = getCategoryService();
  const category = await categoryService.getCategoryBySlug(slug);

  if (!category) return { title: 'Category Not Found' };

  return {
    title: generateCategoryTitle(category.name),
    description: category.description,
    alternates: {
      canonical: generateCanonicalUrl(`/categories/${category.slug}`),
    },
  };
}

export async function generateStaticParams() {
  const categoryService = getCategoryService();
  const slugs = await categoryService.getCategorySlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryService = getCategoryService();
  const toolService = getToolService();

  const category = await categoryService.getCategoryBySlug(slug);
  if (!category) notFound();

  const tools = await toolService.getTools({ category: slug, pageSize: 50 });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-gray-500">
        <a href="/" className="hover:text-gray-700">Home</a>
        <span className="mx-2">/</span>
        <a href="/categories" className="hover:text-gray-700">Categories</a>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{category.name}</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">{category.name} Tools</h1>
        <p className="mt-2 text-lg text-gray-600">{category.description}</p>
        <p className="mt-1 text-sm text-gray-500">{tools.total} tools available</p>
      </div>

      <AdSlot slot={AD_SLOTS.CATEGORY_LIST} format="horizontal" className="mb-8" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.items.map((tool) => (
          <ToolCard
            key={tool.id}
            name={tool.name}
            slug={tool.slug}
            shortDescription={tool.shortDescription}
            categoryName={tool.categoryName}
            categorySlug={tool.categorySlug}
            logoUrl={tool.logoUrl}
            pricingType={tool.pricingType as PricingType}
            isFeatured={tool.isFeatured}
          />
        ))}
      </div>
    </div>
  );
}
