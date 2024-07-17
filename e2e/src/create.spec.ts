import { test, expect, Page } from '@playwright/test';
import { GuidedFormCreation, Create } from '../../packages/design/src/FormManager/routes';
import { BASE_URL } from './constants';
import { pathToRegexp } from 'path-to-regexp';

interface PageData {
  title: string;
  pattern?: Array<string>;
}

const createNewForm = async (page: Page) => {
  await page.goto(`${BASE_URL}/${GuidedFormCreation.getUrl()}`);
  await page.getByRole('button', { name: 'Create New' }).click();
}

const addQuestions = async (page: Page) => {
  const menuButton = page.getByRole('button', { name: 'Question' });
  await menuButton.click();
  await page.getByRole('button', { name: 'Short Answer' }).click();
  await menuButton.click();
  await page.getByRole('button', { name: 'Radio Buttons' }).click();
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
  await addQuestions(page);

  // Create locators for both elements
  const fields = page.locator('.usa-label');
  const element1 = fields.filter({ hasText: 'Field label' });
  const element2 = fields.filter({ hasText: 'Radio group label' });
  expect(element1.first()).toBeTruthy();
  expect(element2.first()).toBeTruthy();

  const htmlContent = await page.content();

  const element1Index = htmlContent.indexOf((await element1.textContent() as string));
  const element2Index = htmlContent.indexOf((await element2.textContent() as string));
  expect(element1Index).toBeLessThan(element2Index);

});

test('Drag-and-drop questions via mouse interaction', async ({ page }) => {
  await createNewForm(page);
  await addQuestions(page);

  const handle = page.locator('[aria-describedby="DndDescribedBy-0"]').first();
  await handle.hover();
  await page.mouse.down();
  const nextElement = page.locator('.draggable-list-item-wrapper').nth(1);
  await nextElement.hover();
  await page.mouse.up();

  // Initiating a reorder clones the element. We want to await the count to go back to 1 to
  // signify the invocation of the drag event has completed and the update has rendered.
  await expect(page.getByText('Field label')).toHaveCount(1, {
    timeout: 10000
  });

  await expect(page.locator('.draggable-list-item-wrapper').nth(1)).toContainText('Field label');

});

test('Drag-and-drop pages via mouse interaction', async ({ context, page }) => {
  const key = '62ba7264-e869-40fc-ac68-5892f1228a9b';
  const obj = {
    "summary": {
      "title": "My form - 2024-07-10T20:20:08.037Z",
      "description": ""
    },
    "root": "root",
    "patterns": {
      "root": {
        "type": "page-set",
        "id": "root",
        "data": {
          "pages": [
            "cbd810ef-fd29-48f6-901b-fa88ab4f4100",
            "5e4381b5-c05e-4471-ba1c-cd4ff045ab74",
            "aca1a6a4-e7ba-4f37-bdf1-2726aa40831a"
          ]
        }
      },
      "cbd810ef-fd29-48f6-901b-fa88ab4f4100": {
        "type": "page",
        "id": "cbd810ef-fd29-48f6-901b-fa88ab4f4100",
        "data": {
          "title": "Page 1",
          "patterns": [
            "242dde5a-2b04-4050-8bc1-ebe6c4137c65",
            "b5544ac4-feca-4283-9639-9af34b70af0c"
          ]
        }
      },
      "5e4381b5-c05e-4471-ba1c-cd4ff045ab74": {
        "id": "5e4381b5-c05e-4471-ba1c-cd4ff045ab74",
        "type": "page",
        "data": {
          "title": "A new page",
          "patterns": []
        }
      },
      "aca1a6a4-e7ba-4f37-bdf1-2726aa40831a": {
        "id": "aca1a6a4-e7ba-4f37-bdf1-2726aa40831a",
        "type": "page",
        "data": {
          "title": "Different Page",
          "patterns": []
        }
      },
      "242dde5a-2b04-4050-8bc1-ebe6c4137c65": {
        "id": "242dde5a-2b04-4050-8bc1-ebe6c4137c65",
        "type": "paragraph",
        "data": {
          "text": "Paragraph text..."
        }
      },
      "b5544ac4-feca-4283-9639-9af34b70af0c": {
        "id": "b5544ac4-feca-4283-9639-9af34b70af0c",
        "type": "input",
        "data": {
          "label": "Field label",
          "initial": "",
          "required": true,
          "maxLength": 128
        }
      }
    },
    "outputs": []
  };
  const value = JSON.stringify(obj);

  await context.addInitScript(([key, value]) => {
    localStorage.setItem(key, value);
  }, [key, value])

  const pageTitles = Object.values(obj.patterns).filter(item => {
    return item.type === 'page';
  }).map(item => {
    return (item.data as PageData).title;
  });

  await page.goto(`${BASE_URL}`);


  await page.getByRole('link', { name: 'Edit' }).click();

  const handle = page.locator('ul').filter({ hasText: pageTitles.join('') }).getByRole('button').first();
  await handle.hover();
  await page.mouse.down();
  const nextElement = page.locator('ul').filter({ hasText: pageTitles.join('') }).getByRole('button').nth(1);
  await nextElement.hover();

  await page.mouse.up();

  await page.waitForFunction((pageTitles) => {
    const items = document.querySelectorAll('.usa-sidenav .draggable-list-item-wrapper');
    return (items[0] as HTMLElement).innerText === pageTitles[1] && items.length === 3;
  }, pageTitles);
  const pageTitlesCopy = [...pageTitles];
  const newFirstItem = pageTitlesCopy.shift();

  const newPageTitles = pageTitlesCopy.toSpliced(1, 0, newFirstItem || '');
  const reorderedFirst = page.locator('ul').filter({ hasText: newPageTitles.join('') }).getByRole('button').first();

  await expect(reorderedFirst).toBeVisible();

});