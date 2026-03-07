'use client';

import { cn } from '../lib/utils';

interface AdSlotProps {
  slot: string;
  className?: string;
  format?: 'horizontal' | 'vertical' | 'rectangle';
}

/**
 * AdSense placeholder component.
 * Replace the inner content with actual AdSense script when ready.
 * See docs/monetization/adsense-slots.md for integration guide.
 */
export function AdSlot({ slot, className, format = 'horizontal' }: AdSlotProps) {
  const isProduction = process.env.NODE_ENV === 'production';

  const sizeClasses = {
    horizontal: 'h-[90px] w-full',
    vertical: 'h-[600px] w-[160px]',
    rectangle: 'h-[250px] w-[300px]',
  };

  // In production, this would render the actual AdSense code
  // For now, render a placeholder
  return (
    <div
      className={cn('relative overflow-hidden rounded-lg', sizeClasses[format], className)}
      data-ad-slot={slot}
      data-ad-format={format}
      aria-hidden="true"
    >
      {!isProduction && (
        <div className="flex h-full w-full items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400">
          Ad: {slot}
        </div>
      )}
      {/*
        Production AdSense integration:
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      */}
    </div>
  );
}
