import { cn } from '../lib/utils';
import type { PricingType } from '@aitoolhunt/shared';

interface PricingBadgeProps {
  type: PricingType;
  className?: string;
}

const styles: Record<PricingType, string> = {
  free: 'bg-green-100 text-green-800 border-green-200',
  freemium: 'bg-blue-100 text-blue-800 border-blue-200',
  paid: 'bg-purple-100 text-purple-800 border-purple-200',
  contact: 'bg-gray-100 text-gray-800 border-gray-200',
};

const labels: Record<PricingType, string> = {
  free: 'Free',
  freemium: 'Freemium',
  paid: 'Paid',
  contact: 'Contact',
};

export function PricingBadge({ type, className }: PricingBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        styles[type],
        className,
      )}
    >
      {labels[type]}
    </span>
  );
}
