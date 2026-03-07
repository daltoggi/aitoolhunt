import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('header Categories link navigates correctly', async ({ page }) => {
    await page.goto('/');
    await page.locator('header a[href="/categories"]').click();
    await expect(page).toHaveURL('/categories');
  });

  test('header Search link navigates correctly', async ({ page }) => {
    await page.goto('/');
    await page.locator('header a[href="/search"]').first().click();
    await expect(page).toHaveURL('/search');
  });

  test('header About link navigates correctly', async ({ page }) => {
    await page.goto('/');
    await page.locator('header a[href="/about"]').click();
    await expect(page).toHaveURL('/about');
  });

  test('header logo navigates to homepage', async ({ page }) => {
    await page.goto('/about');
    await page.locator('header a[href="/"]').click();
    await expect(page).toHaveURL('/');
  });

  test('clicking a tool card navigates to tool detail', async ({ page }) => {
    await page.goto('/');
    const toolLink = page.locator('a[href^="/tools/"]').first();
    const href = await toolLink.getAttribute('href');
    await toolLink.click();
    await expect(page).toHaveURL(href!);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('clicking a category card navigates to category detail', async ({ page }) => {
    await page.goto('/');
    const categoryLink = page
      .locator('section:has(h2:text("Browse by Category")) a[href^="/categories/"]')
      .first();
    const href = await categoryLink.getAttribute('href');
    await categoryLink.click();
    await expect(page).toHaveURL(href!);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('tool detail breadcrumb navigation works', async ({ page }) => {
    await page.goto('/tools/chatgpt');

    // Click Home in breadcrumb
    await page.locator('nav a[href="/"]').first().click();
    await expect(page).toHaveURL('/');
  });

  test('category detail breadcrumb navigation works', async ({ page }) => {
    await page.goto('/categories/ai-writing');

    // Click Categories in breadcrumb (inside main, not header)
    await page.locator('main nav a[href="/categories"]').click();
    await expect(page).toHaveURL('/categories');
  });

  test('View all links work on homepage', async ({ page }) => {
    await page.goto('/');

    // "All categories →" link (inside main content, not header nav)
    const allCategoriesLink = page.locator('main a:has-text("All categories")');
    await expect(allCategoriesLink).toBeVisible();
  });
});
