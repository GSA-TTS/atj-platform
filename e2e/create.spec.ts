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
  const localStorageValue = await page.evaluate((token: string) => localStorage.getItem(token), tokenId[0]);

  console.log(localStorageValue);
  // {"summary":{"title":"My form - 2024-06-19T01:45:33.643Z","description":""},"root":"root","patterns":{"root":{"type":"page-set","id":"root","data":{"pages":["e8f7f9af-45c8-463f-960f-2f2902ff86f3"]}},"e8f7f9af-45c8-463f-960f-2f2902ff86f3":{"type":"page","id":"e8f7f9af-45c8-463f-960f-2f2902ff86f3","data":{"patterns":["d5ba6957-f0d3-48a0-a503-8b98e014ffb7","3cb8b05a-c9f6-4396-aa6e-06ecf378a29a"]}},"d5ba6957-f0d3-48a0-a503-8b98e014ffb7":{"id":"d5ba6957-f0d3-48a0-a503-8b98e014ffb7","type":"input","data":{"label":"Field label","initial":"","required":true,"maxLength":128}},"3cb8b05a-c9f6-4396-aa6e-06ecf378a29a":{"id":"3cb8b05a-c9f6-4396-aa6e-06ecf378a29a","type":"radio-group","data":{"label":"Radio group label","options":[{"id":"option-1","label":"Option 1"},{"id":"option-2","label":"Option 2"}]}}},"outputs":[]}

});
