import { test, expect, Page, Response } from '@playwright/test';
import { GuidedFormCreation, Create } from '../packages/design/src/FormManager/routes';
import { BASE_URL } from './constants';

const uuidPattern = '[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';

const createNewForm = async (page: Page) => {
  await page.goto(`${BASE_URL}/${GuidedFormCreation.getUrl()}`);
  await page.getByRole('button', { name: 'Create New' }).click();
}

const getLocalStorageData = async (page: Page, token: string) => {
  console.log(localStorage);
  const localStorageValue = await page.evaluate((token) => localStorage.getItem(token), token);
  return JSON.parse((localStorageValue as string));
};

const getPatternData = (storageData: any, pageNumber: number, patternIndex: number) => {
  const patternPage = storageData.patterns.root.data.pages[pageNumber];
  return storageData.patterns[patternPage].data.patterns[patternIndex];
}

test('Open site', async ({ page }) => {
  const response = await page.goto(`${BASE_URL}`);
  await expect(response.ok()).toBe(true);
});

test('Create form from scratch', async ({ page }) => {
  const createPage = new RegExp(`${uuidPattern}/${Create.slug}$`, 'i');
  await createNewForm(page);
  await expect(page).toHaveURL(createPage);
});

test('Add questions', async ({ page }) => {
  const formId = new RegExp( `${uuidPattern}`, 'i');
  await createNewForm(page);

  const tokenId = page.url().match(formId);

  const menuButton = page.getByRole('button', { name: 'Question' });
  await menuButton.click();
  await page.getByRole('button', { name: 'Short Answer' }).click();
  await menuButton.click();
  await page.getByRole('button', { name: 'Radio Buttons' }).click();

  const storageData = await getLocalStorageData(page, (tokenId as Array<any>)[0]);
  const firstPattern = getPatternData(storageData, 0, 0);
  const secondPattern = getPatternData(storageData, 0, 1);

  expect(firstPattern).toBe(firstPattern);
  expect(secondPattern).toBe(secondPattern);

});
