import { getToolService, getCategoryService } from '@/lib/db';
import { ToolCard, CategoryCard, AdSlot } from '@aitoolhunt/ui';
import { AD_SLOTS } from '@aitoolhunt/shared';
import { HomeSearch } from '@/components/home-search';

// Statically generated at build time

export default async function HomePage() {
  const toolService = getToolService();
  const categoryService = getCategoryService();

  const [featured, categories] = await Promise.all([
    toolService.getFeaturedTools(6),
    categoryService.getCategories(),
  ]);

  const latestResult = await toolService.getTools({ sort: 'newest', pageSize: 6 });

  return (
    <div>
      {/* Hero Section - Fitts's Law: large click target, Miller's Law: 7+/-2 items */}
      <section className="bg-gradient-to-b from-indigo-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Discover the Best{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Tools
            </span>{' '}
            for Every Task
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Browse {latestResult.total}+ AI tools across {categories.length} categories.
            Find the perfect tool for writing, coding, design, and more.
          </p>
          <div className="mx-auto mt-8 max-w-xl">
            <HomeSearch />
          </div>
        </div>
      </section>

      {/* Ad Slot - Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdSlot slot={AD_SLOTS.HEADER_BANNER} format="horizontal" className="my-4" />
      </div>

      {/* Featured Tools - Von Restorff: featured items stand out */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Featured Tools</h2>
          <a href="/search?sort=featured" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            View all →
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((tool) => (
            <ToolCard
              key={tool.id}
              name={tool.name}
              slug={tool.slug}
              shortDescription={tool.shortDescription}
              categoryName={tool.categoryName || ''}
              categorySlug={tool.categorySlug || ''}
              logoUrl={tool.logoUrl}
              pricingType={tool.pricingType as 'free' | 'freemium' | 'paid' | 'contact'}
              isFeatured={tool.isFeatured}
            />
          ))}
        </div>
      </section>

      {/* Categories - Hick's Law: clear categories reduce decision time */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
            <a href="/categories" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              All categories →
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
      </section>

      {/* Latest Tools */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Recently Added</h2>
          <a href="/search?sort=newest" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            View all →
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestResult.items.map((tool) => (
            <ToolCard
              key={tool.id}
              name={tool.name}
              slug={tool.slug}
              shortDescription={tool.shortDescription}
              categoryName={tool.categoryName}
              categorySlug={tool.categorySlug}
              logoUrl={tool.logoUrl}
              pricingType={tool.pricingType as 'free' | 'freemium' | 'paid' | 'contact'}
              isFeatured={tool.isFeatured}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
