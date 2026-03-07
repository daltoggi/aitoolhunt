export const SITE_NAME = 'AI Tool Hunt';
export const SITE_DESCRIPTION =
  'Discover the best AI tools for every task. Compare features, pricing, and reviews.';
export const SITE_URL = 'https://aitoolhunt.vercel.app';

export function generateToolTitle(toolName: string): string {
  return `${toolName} - Review, Features & Pricing | ${SITE_NAME}`;
}

export function generateCategoryTitle(categoryName: string): string {
  return `Best ${categoryName} Tools in 2026 | ${SITE_NAME}`;
}

export function generateToolDescription(toolName: string, shortDescription: string): string {
  return `${toolName}: ${shortDescription}. Compare features, pricing, alternatives and more on ${SITE_NAME}.`;
}

export function generateCanonicalUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

export interface StructuredDataTool {
  name: string;
  description: string;
  url: string;
  category: string;
  pricingType: string;
}

export function generateToolStructuredData(tool: StructuredDataTool): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: tool.url,
    applicationCategory: tool.category,
    offers: {
      '@type': 'Offer',
      price: tool.pricingType === 'free' ? '0' : undefined,
      priceCurrency: 'USD',
      availability: 'https://schema.org/OnlineOnly',
    },
  };
}
