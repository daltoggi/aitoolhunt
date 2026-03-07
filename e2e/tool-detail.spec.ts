import { test, expect } from '@playwright/test';

test.describe('Tool Detail Page', () => {
  test('shows tool information for ChatGPT', async ({ page }) => {
    await page.goto('/tools/chatgpt');
    await expect(page).toHaveTitle(/ChatGPT/);

    // Tool name heading
    const heading = page.locator('h1');
    await expect(heading).toContainText('ChatGPT');
  });

  test('has breadcrumb navigation', async ({ page }) => {
    await page.goto('/tools/chatgpt');

    // Breadcrumb is inside main content, not header
    const breadcrumb = page.locator('main nav').first();
    await expect(breadcrumb.locator('a[href="/"]')).toBeVisible();
    // Category link in breadcrumb
    const categoryLink = breadcrumb.locator('a[href^="/categories/"]');
    await expect(categoryLink).toBeVisible();
  });

  test('shows pricing badge', async ({ page }) => {
    await page.goto('/tools/chatgpt');

    // Look for pricing badge text (Free, Freemium, Paid)
    const pricingBadge = page.locator('text=/Free|Freemium|Paid/i').first();
    await expect(pricingBadge).toBeVisible();
  });

  test('shows Visit Website CTA button', async ({ page }) => {
    await page.goto('/tools/chatgpt');

    const ctaButton = page.locator('a:has-text("Visit Website")');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveAttribute('target', '_blank');
  });

  test('shows About section', async ({ page }) => {
    await page.goto('/tools/chatgpt');

    const aboutHeading = page.getByRole('heading', { name: /About ChatGPT/i });
    await expect(aboutHeading).toBeVisible();
  });

  test('shows Key Features section', async ({ page }) => {
    await page.goto('/tools/chatgpt');

    const featuresHeading = page.getByRole('heading', { name: 'Key Features' });
    await expect(featuresHeading).toBeVisible();

    // Features should be in a list
    const featureItems = page.locator('li:near(:text("Key Features"))');
    expect(await featureItems.count()).toBeGreaterThan(0);
  });

  test('shows Quick Info sidebar', async ({ page }) => {
    await page.goto('/tools/chatgpt');

    const quickInfoHeading = page.getByRole('heading', { name: 'Quick Info' });
    await expect(quickInfoHeading).toBeVisible();

    // Category info
    await expect(page.locator('text=Category')).toBeVisible();
    // Pricing info
    await expect(page.locator('dt:has-text("Pricing")')).toBeVisible();
  });

  test('shows Related Tools in sidebar', async ({ page }) => {
    await page.goto('/tools/chatgpt');

    const relatedHeading = page.getByRole('heading', { name: 'Related Tools' });
    await expect(relatedHeading).toBeVisible();

    // Related tool links
    const relatedLinks = page.locator('h3:has-text("Related Tools") ~ div a[href^="/tools/"]');
    expect(await relatedLinks.count()).toBeGreaterThan(0);
  });

  test('shows structured data (JSON-LD)', async ({ page }) => {
    await page.goto('/tools/chatgpt');

    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
  });

  test('More Category Tools button works', async ({ page }) => {
    await page.goto('/tools/chatgpt');

    const categoryButton = page.locator('a:has-text("More")').filter({ hasText: 'Tools' });
    await expect(categoryButton).toBeVisible();
    await expect(categoryButton).toHaveAttribute('href', /\/categories\//);
  });

  test('returns error for non-existent tool', async ({ page }) => {
    const response = await page.goto('/tools/this-tool-does-not-exist-xyz');
    // SSG may return 404 or 500 for non-pre-rendered paths
    expect(response?.status()).toBeGreaterThanOrEqual(400);
  });
});
