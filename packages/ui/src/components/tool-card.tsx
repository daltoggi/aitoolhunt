import { cn } from '../lib/utils';
import type { PricingType } from '@aitoolhunt/shared';

interface ToolCardProps {
  name: string;
  slug: string;
  shortDescription: string;
  categoryName: string;
  categorySlug: string;
  logoUrl: string | null;
  pricingType: PricingType;
  isFeatured: boolean;
  tags?: string[];
}

const pricingBadgeColors: Record<PricingType, string> = {
  free: 'bg-green-100 text-green-800',
  freemium: 'bg-blue-100 text-blue-800',
  paid: 'bg-purple-100 text-purple-800',
  contact: 'bg-gray-100 text-gray-800',
};

export function ToolCard({
  name,
  slug,
  shortDescription,
  categoryName,
  pricingType,
  isFeatured,
}: ToolCardProps) {
  return (
    <a
      href={`/tools/${slug}`}
      className={cn(
        'group relative flex flex-col rounded-xl border bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md',
        isFeatured && 'border-amber-200 ring-1 ring-amber-100',
      )}
    >
      {isFeatured && (
        <span className="absolute -top-2 right-4 rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-semibold text-white">
          Featured
        </span>
      )}

      <div className="mb-3 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 text-lg font-bold text-indigo-600">
          {name.charAt(0)}
        </div>
        <span
          className={cn(
            'rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
            pricingBadgeColors[pricingType],
          )}
        >
          {pricingType}
        </span>
      </div>

      <h3 className="mb-1 text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
        {name}
      </h3>

      <p className="mb-3 line-clamp-2 flex-1 text-sm text-gray-600">{shortDescription}</p>

      <div className="flex items-center justify-between border-t pt-3">
        <span className="text-xs font-medium text-gray-500">{categoryName}</span>
        <span className="text-xs text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100">
          Learn more →
        </span>
      </div>
    </a>
  );
}
