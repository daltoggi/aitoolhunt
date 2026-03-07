import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getToolService } from '@/lib/db';
import { AdSlot, PricingBadge } from '@aitoolhunt/ui';
import {
  AD_SLOTS,
  generateToolTitle,
  generateToolDescription,
  generateCanonicalUrl,
  generateToolStructuredData,
} from '@aitoolhunt/shared';
import type { PricingType } from '@aitoolhunt/shared';
import { StructuredData } from '@/components/structured-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const toolService = getToolService();
  const tool = await toolService.getToolBySlug(slug);

  if (!tool) return { title: 'Tool Not Found' };

  return {
    title: generateToolTitle(tool.name),
    description: generateToolDescription(tool.name, tool.shortDescription),
    alternates: {
      canonical: generateCanonicalUrl(`/tools/${tool.slug}`),
    },
    openGraph: {
      title: generateToolTitle(tool.name),
      description: generateToolDescription(tool.name, tool.shortDescription),
      url: generateCanonicalUrl(`/tools/${tool.slug}`),
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  const toolService = getToolService();
  const slugs = await toolService.getToolSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const toolService = getToolService();
  const tool = await toolService.getToolBySlug(slug);

  if (!tool) notFound();

  const relatedTools = await toolService.getRelatedTools(tool.id, tool.categoryId);

  const structuredData = generateToolStructuredData({
    name: tool.name,
    description: tool.shortDescription,
    url: tool.websiteUrl,
    category: tool.category.name,
    pricingType: tool.pricingType,
  });

  return (
    <>
      <StructuredData data={structuredData} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500">
          <a href="/" className="hover:text-gray-700">Home</a>
          <span className="mx-2">/</span>
          <a href={`/categories/${tool.category.slug}`} className="hover:text-gray-700">
            {tool.category.name}
          </a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{tool.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8 rounded-xl border bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-2xl font-bold text-indigo-600">
                  {tool.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
                    <PricingBadge type={tool.pricingType as PricingType} />
                  </div>
                  <p className="mt-2 text-lg text-gray-600">{tool.shortDescription}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href={tool.affiliateUrl || tool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
                >
                  Visit Website
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
                <a
                  href={`/categories/${tool.category.slug}`}
                  className="inline-flex items-center rounded-lg border px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  More {tool.category.name} Tools
                </a>
              </div>
            </div>

            <AdSlot slot={AD_SLOTS.TOOL_DETAIL_TOP} format="horizontal" className="mb-8" />

            {/* Description */}
            <div className="mb-8 rounded-xl border bg-white p-8 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">About {tool.name}</h2>
              <p className="whitespace-pre-line leading-relaxed text-gray-700">{tool.description}</p>
            </div>

            {/* Features */}
            {tool.features.length > 0 && (
              <div className="mb-8 rounded-xl border bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-gray-900">Key Features</h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {tool.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg className="h-5 w-5 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <AdSlot slot={AD_SLOTS.TOOL_DETAIL_MIDDLE} format="horizontal" className="mb-8" />

            {/* Use Cases */}
            {tool.useCases.length > 0 && (
              <div className="rounded-xl border bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-gray-900">Use Cases</h2>
                <div className="flex flex-wrap gap-2">
                  {tool.useCases.map((useCase, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-bold text-gray-900">Quick Info</h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Category</dt>
                  <dd>
                    <a href={`/categories/${tool.category.slug}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                      {tool.category.name}
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Pricing</dt>
                  <dd><PricingBadge type={tool.pricingType as PricingType} /></dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Website</dt>
                  <dd>
                    <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                      Visit
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <AdSlot slot={AD_SLOTS.SIDEBAR} format="rectangle" className="mx-auto" />

            {relatedTools.length > 0 && (
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-bold text-gray-900">Related Tools</h3>
                <div className="space-y-3">
                  {relatedTools.map((related) => (
                    <a
                      key={related.id}
                      href={`/tools/${related.slug}`}
                      className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600">
                        {related.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-900">{related.name}</p>
                        <p className="truncate text-xs text-gray-500">{related.shortDescription}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
