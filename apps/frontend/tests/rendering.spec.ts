import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Homepage', () => {
  test('has title and h1', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page).toHaveTitle(/ATJ Test Bed/);
    const locator = page.locator('h1');
    await expect(locator).toHaveText('ATJ Test Bed');
  });

  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173/');
    const accessibilityScanResults = await new AxeBuilder({
      page,
    }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
