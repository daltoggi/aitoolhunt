# Code Review Checklist

## General

- [ ] Code compiles and builds without errors
- [ ] No new TypeScript/ESLint warnings
- [ ] Follows existing patterns and conventions
- [ ] Proper error handling (no silent failures)

## TypeScript

- [ ] Strict types (no `any` unless justified)
- [ ] Interfaces for all data structures
- [ ] Proper null checks
- [ ] Barrel exports updated in index.ts

## React / Next.js

- [ ] Server vs Client component separation clear
- [ ] No unnecessary `'use client'` directives
- [ ] Proper key props on list items
- [ ] Metadata/SEO for new pages
- [ ] Images use Next.js Image component where possible

## Database

- [ ] New queries have proper WHERE clauses
- [ ] Indexes considered for frequent queries
- [ ] No N+1 query patterns
- [ ] Migrations tested both up and down

## SEO

- [ ] New pages have generateMetadata
- [ ] Canonical URLs set
- [ ] Structured data (JSON-LD) for tool pages
- [ ] Sitemap updated for new routes

## Performance

- [ ] No large dependencies added unnecessarily
- [ ] Images optimized (WebP/AVIF when possible)
- [ ] Bundle size checked (next build output)
- [ ] No blocking requests in critical path

## Security

- [ ] No secrets in code
- [ ] External links have rel noopener noreferrer
- [ ] User input sanitized
- [ ] Inline scripts only use trusted data from own DB

## Testing

- [ ] Unit tests for utility functions
- [ ] Integration tests for service methods
- [ ] Edge cases covered (empty data, nulls)
