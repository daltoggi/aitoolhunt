# Performance Optimization Guide

## Current Performance

### Bundle Size (First Load JS)

- Shared: 102 KB
- Homepage: 111 KB
- Tool Detail: 110 KB
- Search: 112 KB

### Rendering Strategy

- **SSG** for all 66 pages (zero TTFB overhead)
- **Client-side** search with pre-built JSON (~15KB)

## Optimization Strategies

### Already Implemented

1. **Static Site Generation** - All pages pre-rendered at build time
2. **Code Splitting** - Next.js automatic route-based splitting
3. **Tailwind CSS v4** - Only used classes shipped
4. **Server Components** - Minimal client JS (only search + home search)

### Future Optimizations

1. **Image Optimization** - Add tool logos as WebP via Next.js Image
2. **Font Optimization** - Use next/font for system font stack
3. **ISR** - Incremental Static Regeneration when switching to Turso
4. **Edge Caching** - Vercel CDN headers for static assets
5. **Lazy Loading** - Below-fold tool cards with Intersection Observer

## Monitoring

- Vercel Analytics (free tier) for Core Web Vitals
- Lighthouse CI in GitHub Actions (future)

## Bundle Analysis

```bash
ANALYZE=true pnpm --filter @aitoolhunt/web build
```

(Requires @next/bundle-analyzer setup)
