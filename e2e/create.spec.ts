import { test, expect } from '@playwright/test';
import * as AppRoutes from '../packages/design/src/FormManager/routes';
import { BASE_URL } from './constants';

const uuidPattern = '[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}'

test('Create form from scratch', async ({ page }) => {
  const createPage = new RegExp(`${uuidPattern}/${AppRoutes.Create.slug}$`, 'i');
  await page.goto(`${BASE_URL}/${AppRoutes.GuidedFormCreation.getUrl()}`);
  await page.getByRole('button', { name: 'Create New' }).click();
  await expect(page).toHaveURL(createPage);
});

test('Add questions', async ({ page }) => {
  const formId = new RegExp( `${uuidPattern}`, 'i');
  await page.goto(`${BASE_URL}/${AppRoutes.GuidedFormCreation.getUrl()}`);
  await page.getByRole('button', { name: 'Create New' }).click();

  const tokenId = page.url().match(formId);
  const menuButton = page.getByRole('button', { name: 'Question' });
  await menuButton.click();
  await page.getByRole('button', { name: 'Short Answer' }).click();
  await menuButton.click();
  await page.getByRole('button', { name: 'Radio Buttons' }).click();
  const localStorageValue = await page.evaluate((token: string) => localStorage.getItem(token), (tokenId as Array<string>)[0]);
  const storageData = JSON.parse((localStorageValue as string));

  const firstPage = (storageData.patterns.root.data.pages as Array<string>)[0];
  const firstPattern = storageData.patterns[firstPage].data.patterns[0];
  const secondPattern = storageData.patterns[firstPage].data.patterns[1];

  expect(firstPattern).toBe(firstPattern);
  expect(secondPattern).toBe(secondPattern);

});
