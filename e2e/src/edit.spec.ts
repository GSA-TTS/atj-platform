import { expect, test } from '@playwright/test';
import { BASE_URL } from './constants';

interface PageData {
  title: string;
  pattern?: Array<string>;
}

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
          "patterns": []
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