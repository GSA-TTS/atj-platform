import { test, expect } from '@playwright/test';
import * as AppRoutes from '../packages/design/src/FormManager/routes';
import { BASE_URL } from './constants';

test('Create form from scratch', async ({ page }) => {
  const createSlug = new RegExp(`[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/${AppRoutes.Create.slug}$`, 'i');
  await page.goto(`${BASE_URL}/${AppRoutes.GuidedFormCreation.getUrl()}`);
  await page.getByRole('button', { name: 'Create New' }).click();
  await expect(page).toHaveURL(createSlug);
});
