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

    const heading1 = canvas.getByRole('button', {
      name: 'Heading 1',
    });
    await userEvent.click(heading1);
    await expect(
      canvas.getByText(editorText, { selector: 'h1' })
    ).toBeInTheDocument();
    await userEvent.click(heading1);
    await expect(
      canvas.queryByText(editorText, { selector: 'h1' })
    ).not.toBeInTheDocument();

    const heading2 = canvas.getByRole('button', {
      name: 'Heading 2',
    });
    await userEvent.click(heading2);
    await expect(
      canvas.getByText(editorText, { selector: 'h2' })
    ).toBeInTheDocument();
    await userEvent.click(heading2);
    await expect(
      canvas.queryByText(editorText, { selector: 'h2' })
    ).not.toBeInTheDocument();

    const editor = within(canvas.getByRole('textbox'));
    const bulletList = canvas.getByRole('button', {
      name: 'Bullet list',
    });
    await userEvent.click(bulletList);
    const ulLi = editor.getByRole('listitem')
    await expect(ulLi).toBeInTheDocument();
    await userEvent.click(bulletList);
    await expect(ulLi).not.toBeInTheDocument();

    const orderedList = canvas.getByRole('button', {
      name: 'Ordered list',
    });
    await userEvent.click(orderedList);
    const olLi = editor.getByRole('listitem')
    await expect(olLi).toBeInTheDocument();
    await userEvent.click(orderedList);
    await expect(olLi).not.toBeInTheDocument();
  },
};
