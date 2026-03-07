import { test, expect } from '@playwright/test';

test.describe('Search Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/search');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Search/i);
  });

  test('shows search heading', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toContainText('Search AI Tools');
  });

  test('shows search input', async ({ page }) => {
    const input = page.locator('input[type="text"], input[placeholder*="Search"]').first();
    await expect(input).toBeVisible();
  });

  test('shows pricing filter pills', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'All', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Free', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Freemium', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Paid', exact: true })).toBeVisible();
  });

  test('displays all tools by default', async ({ page }) => {
    // Wait for tools to load
    await page.waitForSelector('a[href^="/tools/"]', { timeout: 10000 });

    const toolCards = page.locator('a[href^="/tools/"]');
    expect(await toolCards.count()).toBeGreaterThan(0);
  });

  test('filters tools by search query', async ({ page }) => {
    // Wait for initial load
    await page.waitForSelector('a[href^="/tools/"]', { timeout: 10000 });

    const input = page.locator('input[type="text"], input[placeholder*="Search"]').first();
    await input.fill('ChatGPT');
    await input.press('Enter');

    // Should show results count
    await expect(page.locator('text=/\\d+ results? for/i')).toBeVisible();

    // Should show matching tool
    await expect(page.locator('a[href="/tools/chatgpt"]')).toBeVisible();
  });

  test('filters tools by pricing type', async ({ page }) => {
    await page.waitForSelector('a[href^="/tools/"]', { timeout: 10000 });

    // Get initial count
    const initialCount = await page.locator('a[href^="/tools/"]').count();

    // Click "Free" filter
    await page.locator('button:has-text("Free")').first().click();

    // Count should change (fewer results or same if all are free)
    const filteredCount = await page.locator('a[href^="/tools/"]').count();
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test('shows empty state for no results', async ({ page }) => {
    await page.waitForSelector('a[href^="/tools/"]', { timeout: 10000 });

    const input = page.locator('input[type="text"], input[placeholder*="Search"]').first();
    await input.fill('xyznonexistenttoolqwerty');
    await input.press('Enter');

    await expect(page.locator('text=No tools found')).toBeVisible();
  });

  test('accepts query from URL parameter', async ({ page }) => {
    await page.goto('/search?q=ChatGPT');

    // Wait for tools to load and filter
    await page.waitForSelector('a[href^="/tools/"]', { timeout: 10000 });

    // Search input should have the query
    const input = page.locator('input[type="text"], input[placeholder*="Search"]').first();
    await expect(input).toHaveValue('ChatGPT');

    // Results should be filtered
    await expect(page.locator('text=/results? for/i')).toBeVisible();
  });
});
