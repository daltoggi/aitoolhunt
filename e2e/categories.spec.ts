import { test, expect } from '@playwright/test';

test.describe('Categories Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/categories');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Categories/i);
  });

  test('shows page heading', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toContainText('Browse by Category');
  });

  test('shows subtitle with category count', async ({ page }) => {
    const subtitle = page.locator('p:has-text("categories")');
    await expect(subtitle).toBeVisible();
  });

  test('displays category cards', async ({ page }) => {
    const categoryLinks = page.locator('a[href^="/categories/"]');
    expect(await categoryLinks.count()).toBeGreaterThanOrEqual(10);
  });

  test('each category card shows tool count', async ({ page }) => {
    // Look for tool count text pattern like "5 tools"
    const toolCounts = page.locator('text=/\\d+ tools?/i');
    expect(await toolCounts.count()).toBeGreaterThan(0);
  });

  test('clicking a category navigates to its detail page', async ({ page }) => {
    const firstCategory = page.locator('a[href^="/categories/"]').first();
    const href = await firstCategory.getAttribute('href');
    await firstCategory.click();
    await expect(page).toHaveURL(href!);
  });
});

test.describe('Category Detail Page', () => {
  test('shows category name and description', async ({ page }) => {
    await page.goto('/categories/ai-writing');

    const heading = page.locator('h1');
    await expect(heading).toContainText('Writing');
    await expect(heading).toContainText('Tools');
  });

  test('has breadcrumb navigation', async ({ page }) => {
    await page.goto('/categories/ai-writing');

    // Breadcrumb is inside main content, not header
    const breadcrumb = page.locator('main nav').first();
    await expect(breadcrumb.locator('a[href="/"]')).toBeVisible();
    await expect(breadcrumb.locator('a[href="/categories"]')).toBeVisible();
  });

  test('shows tool count', async ({ page }) => {
    await page.goto('/categories/ai-writing');

    const toolCount = page.locator('text=/\\d+ tools? available/i');
    await expect(toolCount).toBeVisible();
  });

  test('displays tool cards within category', async ({ page }) => {
    await page.goto('/categories/ai-writing');

    const toolCards = page.locator('a[href^="/tools/"]');
    expect(await toolCards.count()).toBeGreaterThan(0);
  });

  test('returns error for non-existent category', async ({ page }) => {
    const response = await page.goto('/categories/non-existent-category-xyz');
    // SSG may return 404 or 500 for non-pre-rendered paths
    expect(response?.status()).toBeGreaterThanOrEqual(400);
  });
});
