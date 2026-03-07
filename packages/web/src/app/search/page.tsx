import type { Metadata } from 'next';
import { getToolService } from '@/lib/db';
import { ToolCard, AdSlot } from '@aitoolhunt/ui';
import { AD_SLOTS } from '@aitoolhunt/shared';
import type { PricingType } from '@aitoolhunt/shared';
import { SearchPageClient } from '@/components/search-page-client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Search AI Tools',
  description: 'Search and discover the best AI tools. Filter by category, pricing, and features.',
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string; pricing?: string; sort?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const toolService = getToolService();

  const results = await toolService.getTools({
    search: params.q,
    category: params.category,
    pricing: params.pricing,
    sort: (params.sort as 'newest' | 'name' | 'featured') || 'newest',
    pageSize: 24,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Search AI Tools</h1>

      <SearchPageClient
        defaultQuery={params.q || ''}
        defaultCategory={params.category || ''}
        defaultPricing={params.pricing || ''}
      />

      <AdSlot slot={AD_SLOTS.SEARCH_RESULTS} format="horizontal" className="my-6" />

      {params.q && (
        <p className="mb-6 text-sm text-gray-500">
          {results.total} results for &quot;{params.q}&quot;
        </p>
      )}

      {results.items.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.items.map((tool) => (
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
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg text-gray-500">No tools found.</p>
          <p className="mt-2 text-sm text-gray-400">Try a different search term or filter.</p>
        </div>
      )}
    </div>
  );
}
