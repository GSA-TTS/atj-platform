import { test, expect } from '@playwright/test';
import { MyForms } from '../packages/design/src/FormManager/routes';
import { BASE_URL } from './constants';

test('Go to MyForms', async ({ page }) => {
  const response = await page.goto(`${BASE_URL}/${MyForms.getUrl()}`);
  expect(response?.ok()).toBe(true);
});