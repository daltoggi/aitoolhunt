import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/AI Tool Hunt/);
  });

  test('shows hero section with heading', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toContainText('AI Tools');
  });

  test('shows hero subtitle with tool and category counts', async ({ page }) => {
    const subtitle = page.locator('section').first().locator('p').first();
    await expect(subtitle).toContainText('tools across');
    await expect(subtitle).toContainText('categories');
  });

  test('shows search bar in hero', async ({ page }) => {
    const searchInput = page.locator('input[type="text"], input[placeholder*="Search"]').first();
    await expect(searchInput).toBeVisible();
  });

  test('shows Featured Tools section with cards', async ({ page }) => {
    const section = page.getByRole('heading', { name: 'Featured Tools' });
    await expect(section).toBeVisible();

    // Should display tool cards
    const toolCards = page.locator('a[href^="/tools/"]');
    expect(await toolCards.count()).toBeGreaterThan(0);
  });

  test('shows Browse by Category section', async ({ page }) => {
    const section = page.getByRole('heading', { name: 'Browse by Category' });
    await expect(section).toBeVisible();

    // Should display category cards
    const categoryLinks = page.locator('a[href^="/categories/"]');
    expect(await categoryLinks.count()).toBeGreaterThan(0);
  });

  test('shows Recently Added section', async ({ page }) => {
    const section = page.getByRole('heading', { name: 'Recently Added' });
    await expect(section).toBeVisible();
  });

  test('header has logo and navigation', async ({ page }) => {
    // Logo
    await expect(page.locator('header a[href="/"]')).toBeVisible();

    // Navigation links (inside nav element, visible on md+ viewport)
    await expect(page.locator('header nav a[href="/categories"]')).toBeVisible();
    await expect(page.locator('header nav a[href="/search"]')).toBeVisible();
    await expect(page.locator('header nav a[href="/about"]')).toBeVisible();
  });

  test('footer is visible with links', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.locator('a[href="/about"]')).toBeVisible();
  });
});
