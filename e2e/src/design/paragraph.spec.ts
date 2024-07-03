import { test, expect, Page } from '@playwright/test';
import { BASE_URL, STORYBOOK_PATH } from '../constants';
import { en as message } from '@atj/common/src/locales/en/app';

test('Paragraph edit', async ({ page }) => {
  await page.goto(`${BASE_URL}/${STORYBOOK_PATH}edit-components-paragraphpattern--basic`);
  await expect(page.getByText(message.patterns.paragraph.displayName)).toBeVisible();
});