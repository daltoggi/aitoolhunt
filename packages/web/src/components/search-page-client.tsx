'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchBar, ToolCard, AdSlot } from '@aitoolhunt/ui';
import { AD_SLOTS } from '@aitoolhunt/shared';
import type { PricingType } from '@aitoolhunt/shared';

interface ToolItem {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  categoryName: string;
  categorySlug: string;
  logoUrl: string | null;
  pricingType: string;
  isFeatured: boolean;
}

interface SearchData {
  tools: ToolItem[];
}

function SearchInner() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<SearchData | null>(null);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [pricing, setPricing] = useState(searchParams.get('pricing') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/tools.json')
      .then((res) => res.json())
      .then((json: SearchData) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
    setPricing(searchParams.get('pricing') || '');
  }, [searchParams]);

  const filtered = useMemo(() => {
    if (!data) return [];
    let items = data.tools;
    if (query) {
      const q = query.toLowerCase();
      items = items.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q) ||
          t.categoryName.toLowerCase().includes(q),
      );
    }
    if (pricing) {
      items = items.filter((t) => t.pricingType === pricing);
    }
    return items;
  }, [data, query, pricing]);

  const handleSearch = (q: string) => {
    setQuery(q);
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (pricing) params.set('pricing', pricing);
    window.history.replaceState(null, '', `/search?${params.toString()}`);
  };

  const handlePricing = (p: string) => {
    const newPricing = p === 'all' ? '' : p;
    setPricing(newPricing);
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (newPricing) params.set('pricing', newPricing);
    window.history.replaceState(null, '', `/search?${params.toString()}`);
  };

  return (
    <>
      <div className="mb-6">
        <SearchBar
          defaultValue={query}
          onSearch={handleSearch}
          size="md"
          placeholder="Search AI tools by name, feature, or category..."
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {['all', 'free', 'freemium', 'paid'].map((p) => (
            <button
              key={p}
              onClick={() => handlePricing(p)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                (p === 'all' && !pricing) || pricing === p
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {p === 'all' ? 'All' : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <AdSlot slot={AD_SLOTS.SEARCH_RESULTS} format="horizontal" className="my-6" />

      {loading ? (
        <div className="py-20 text-center">
          <p className="text-lg text-gray-400">Loading tools...</p>
        </div>
      ) : (
        <>
          {query && (
            <p className="mb-6 text-sm text-gray-500">
              {filtered.length} results for &quot;{query}&quot;
            </p>
          )}
          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((tool) => (
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
        </>
      )}
    </>
  );
}

export function SearchPageClient() {
  return (
    <Suspense fallback={<div className="py-20 text-center"><p className="text-lg text-gray-400">Loading...</p></div>}>
      <SearchInner />
    </Suspense>
  );
}
