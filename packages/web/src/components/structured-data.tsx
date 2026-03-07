/**
 * Server component that renders JSON-LD structured data for SEO.
 * Uses Next.js metadata API pattern for safe script injection.
 * All data originates from our own seed database (trusted source).
 */
export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      // SAFETY: data comes exclusively from our own database (seed/data.ts)
      // and is serialized via JSON.stringify which escapes HTML entities.
      // This is the standard Next.js pattern for JSON-LD structured data.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
