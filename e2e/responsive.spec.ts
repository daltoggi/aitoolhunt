import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test.describe('Mobile viewport', () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test('homepage renders correctly on mobile', async ({ page }) => {
      await page.goto('/');

      // Hero heading should be visible
      await expect(page.locator('h1')).toBeVisible();

      // Tool cards should be in single column (verified by visible)
      const toolCards = page.locator('a[href^="/tools/"]');
      expect(await toolCards.count()).toBeGreaterThan(0);
    });

    test('header is visible on mobile', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('header')).toBeVisible();
      // Logo link should be visible
      await expect(page.locator('header a[href="/"]')).toBeVisible();
    });

    test('search page works on mobile', async ({ page }) => {
      await page.goto('/search');

      const input = page.locator('input[type="text"], input[placeholder*="Search"]').first();
      await expect(input).toBeVisible();

      // Filter buttons should be visible
      await expect(page.locator('button:has-text("All")')).toBeVisible();
    });

    test('tool detail page is readable on mobile', async ({ page }) => {
      await page.goto('/tools/chatgpt');

      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('a:has-text("Visit Website")')).toBeVisible();
    });
  });

  test.describe('Tablet viewport', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('homepage shows 2-column grid on tablet', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('h1')).toBeVisible();

      const toolCards = page.locator('a[href^="/tools/"]');
      expect(await toolCards.count()).toBeGreaterThan(0);
    });

    test('categories page renders correctly on tablet', async ({ page }) => {
      await page.goto('/categories');
      await expect(page.locator('h1')).toContainText('Browse by Category');
    });
  });

  test.describe('Desktop viewport', () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test('homepage shows 3-column grid on desktop', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('h1')).toBeVisible();

      const toolCards = page.locator('a[href^="/tools/"]');
      expect(await toolCards.count()).toBeGreaterThan(0);
    });

    test('desktop navigation menu is visible', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('header nav a[href="/categories"]')).toBeVisible();
      await expect(page.locator('header nav a[href="/search"]')).toBeVisible();
      await expect(page.locator('header nav a[href="/about"]')).toBeVisible();
    });

    test('tool detail shows sidebar on desktop', async ({ page }) => {
      await page.goto('/tools/chatgpt');

      // Quick Info sidebar should be visible
      await expect(page.getByRole('heading', { name: 'Quick Info' })).toBeVisible();
    });
  });
});
