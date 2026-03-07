'use client';

import { useRouter } from 'next/navigation';
import { SearchBar } from '@aitoolhunt/ui';

interface SearchPageClientProps {
  defaultQuery: string;
  defaultCategory: string;
  defaultPricing: string;
}

export function SearchPageClient({ defaultQuery, defaultCategory, defaultPricing }: SearchPageClientProps) {
  const router = useRouter();

  const handleSearch = (query: string) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (defaultCategory) params.set('category', defaultCategory);
    if (defaultPricing) params.set('pricing', defaultPricing);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="mb-6">
      <SearchBar
        defaultValue={defaultQuery}
        onSearch={handleSearch}
        size="md"
        placeholder="Search AI tools by name, feature, or category..."
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {['all', 'free', 'freemium', 'paid'].map((pricing) => (
          <button
            key={pricing}
            onClick={() => {
              const params = new URLSearchParams();
              if (defaultQuery) params.set('q', defaultQuery);
              if (pricing !== 'all') params.set('pricing', pricing);
              router.push(`/search?${params.toString()}`);
            }}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              (pricing === 'all' && !defaultPricing) || defaultPricing === pricing
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {pricing === 'all' ? 'All' : pricing.charAt(0).toUpperCase() + pricing.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
