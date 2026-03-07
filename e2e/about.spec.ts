import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/About/i);
  });

  test('shows page heading', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toContainText('About AI Tool Hunt');
  });

  test('shows Our Mission section', async ({ page }) => {
    const missionHeading = page.getByRole('heading', { name: 'Our Mission' });
    await expect(missionHeading).toBeVisible();
  });

  test('shows What We Offer section with list', async ({ page }) => {
    const offerHeading = page.getByRole('heading', { name: 'What We Offer' });
    await expect(offerHeading).toBeVisible();

    const listItems = page.locator('ul li');
    expect(await listItems.count()).toBeGreaterThanOrEqual(5);
  });

  test('shows Contact section', async ({ page }) => {
    const contactHeading = page.getByRole('heading', { name: 'Contact' });
    await expect(contactHeading).toBeVisible();
  });
});
