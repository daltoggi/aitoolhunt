import type { Metadata } from 'next';
import { getCategoryService } from '@/lib/db';
import { CategoryCard } from '@aitoolhunt/ui';
import { generateCategoryTitle } from '@aitoolhunt/shared';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Browse AI Tool Categories',
  description: 'Explore AI tools organized by category. Find the best tools for writing, coding, image generation, video, marketing, and more.',
};

export default async function CategoriesPage() {
  const categoryService = getCategoryService();
  const categories = await categoryService.getCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Browse by Category</h1>
        <p className="mt-2 text-lg text-gray-600">
          Explore {categories.length} categories of AI tools
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            name={cat.name}
            slug={cat.slug}
            description={cat.description}
            toolCount={cat.toolCount}
            iconName={cat.iconName}
          />
        ))}
      </div>
    </div>
  );
}
