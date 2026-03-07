import type { Metadata } from 'next';
import { SearchPageClient } from '@/components/search-page-client';

export const metadata: Metadata = {
  title: 'Search AI Tools',
  description: 'Search and discover the best AI tools. Filter by category, pricing, and features.',
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Search AI Tools</h1>
      <SearchPageClient />
    </div>
  );
}
