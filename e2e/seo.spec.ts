import { test, expect } from '@playwright/test';

test.describe('SEO', () => {
  test('homepage has proper meta tags', async ({ page }) => {
    await page.goto('/');

    // OG tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /AI Tool Hunt/);

    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveAttribute('content', 'website');

    // Description
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.+/);
  });

  test('tool detail page has proper meta tags', async ({ page }) => {
    await page.goto('/tools/chatgpt');

    // Title contains tool name
    await expect(page).toHaveTitle(/ChatGPT/);

    // OG tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /ChatGPT/);

    // Canonical URL
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /\/tools\/chatgpt/);
  });

  test('category page has proper meta tags', async ({ page }) => {
    await page.goto('/categories/ai-writing');

    await expect(page).toHaveTitle(/Writing/i);

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /\/categories\/ai-writing/);
  });

  test('sitemap.xml is accessible', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);
    const content = await response?.text();
    expect(content).toContain('<?xml');
    expect(content).toContain('<urlset');
    expect(content).toContain('<url>');
  });

  test('robots.txt is accessible', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);
    const content = await response?.text();
    expect(content).toContain('User-Agent');
    expect(content).toContain('Sitemap');
  });

  test('tool detail page has JSON-LD structured data', async ({ page }) => {
    await page.goto('/tools/chatgpt');

    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();

    const content = await jsonLd.textContent();
    const data = JSON.parse(content!);
    expect(data['@type']).toBe('SoftwareApplication');
    expect(data.name).toBe('ChatGPT');
  });

  test('all static pages return 200 status', async ({ page }) => {
    const pages = ['/', '/categories', '/search', '/about'];

    for (const path of pages) {
      const response = await page.goto(path);
      expect(response?.status(), `${path} should return 200`).toBe(200);
    }
  });
});
