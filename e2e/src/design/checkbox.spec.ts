import { test, expect } from '@playwright/test';
import { BASE_URL, STORYBOOK_PATH } from '../constants';

test('Page set edit', async ({ page }) => {
  await page.goto(`${BASE_URL}/${STORYBOOK_PATH}edit-components-pagesetedit--basic`);
  await expect(page.getByRole('link', { name: 'Page 1 updated' })).toBeVisible();
});