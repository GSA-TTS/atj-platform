import type { Meta, StoryObj } from '@storybook/react';

import { type RichTextPattern } from '@atj/forms/src/patterns/rich-text';
import { en as message } from '@atj/common/src/locales/en/app';

import { createPatternEditStoryMeta } from '../common/story-helper';
import FormEdit from '../../';
import { expect, userEvent } from '@storybook/test';
import { within } from '@testing-library/react';

const editorText = 'Rich text...';

const pattern: RichTextPattern = {
  id: '1',
  type: 'rich-text',
  data: {
    text: `<p>${editorText}</p>`,
  },
};

const storyConfig: Meta = {
  title: 'Edit components/RichTextPattern',
  ...createPatternEditStoryMeta({
    pattern,
  }),
} as Meta<typeof FormEdit>;
export default storyConfig;

export const Basic: StoryObj<typeof FormEdit> = {};

export const Formatting: StoryObj<typeof FormEdit> = {
  play: async ({ canvasElement }) => {
    userEvent.setup();

    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByText(message.patterns.richText.displayName)
    );

    const headingMap: Record<string, string> = {
      'Heading 1': 'h1',
      'Heading 2': 'h2'
    };

    const listMap: Record<string, string> = {
      'Bullet list': 'listitem',
      'Ordered list': 'listitem'
    };

    const editor = within(canvas.getByRole('textbox'));

    async function clickButtonAndCheckByText(buttonName: string, selector: string) {
      const button = canvas.getByRole('button', { name: buttonName });

      await userEvent.click(button);
      const element = editor.getByText(editorText, { selector });
      await expect(element).toBeInTheDocument();

      await userEvent.click(button);
      await expect(element).not.toBeInTheDocument();
    }
    
    async function clickButtonAndCheckByRole(buttonName: string, selector: string) {
      const button = canvas.getByRole('button', { name: buttonName });

      await userEvent.click(button);
      const element = editor.getByRole(selector);
      await expect(element).toBeInTheDocument();

      await userEvent.click(button);
      await expect(element).not.toBeInTheDocument();
    }

    // Iterate over the map and call the function for each pair
    for (const [buttonName, selector] of Object.entries(headingMap)) {
      await clickButtonAndCheckByText(buttonName, selector);
    }

    for (const [buttonName, selector] of Object.entries(listMap)) {
      await clickButtonAndCheckByRole(buttonName, selector);
    }
  },
};
