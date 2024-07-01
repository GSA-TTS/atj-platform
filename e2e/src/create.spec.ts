import { test, expect, Page } from '@playwright/test';
import { GuidedFormCreation, Create } from '../../packages/design/src/FormManager/routes';
import { BASE_URL } from './constants';
import { pathToRegexp } from 'path-to-regexp';


const createNewForm = async (page: Page) => {
  console.log(`${BASE_URL}/${GuidedFormCreation.getUrl()}`);
  await page.goto(`${BASE_URL}/${GuidedFormCreation.getUrl()}`);
  await page.getByRole('button', { name: 'Create New' }).click();
}

test('Create form from scratch', async ({ page }) => {
  const regexp = pathToRegexp(Create.path);
  await createNewForm(page);
  let pageUrl = page.url();
  let pagePath = '';

  if(Create.getUrl().indexOf('#') === 0) {
    const parts = pageUrl.split('#');
    if(parts.length === 2) {
      pagePath = parts[1];
    }
  } else {
    pagePath = new URL(pageUrl).pathname;
  }

  expect(regexp.test(pagePath)).toBe(true);
});

test('Add questions', async ({ page }) => {
  await createNewForm(page);

  const menuButton = page.getByRole('button', { name: 'Question' });
  await menuButton.click();
  await page.getByRole('button', { name: 'Short Answer' }).click();
  await menuButton.click();
  await page.getByRole('button', { name: 'Radio Buttons' }).click();

  // Create locators for both elements
  const fields = page.locator('.usa-label');
  const element1 = fields.filter({ hasText: 'Field Label' })
  const element2 = fields.filter({ hasText: 'Radio group label' });
  expect(element1.first()).toBeTruthy();
  expect(element2.first()).toBeTruthy();

  const htmlContent = await page.content();

  const element1Index = htmlContent.indexOf((await element1.textContent() as string));
  const element2Index = htmlContent.indexOf((await element2.textContent() as string));
  expect(element1Index).toBeLessThan(element2Index);

});