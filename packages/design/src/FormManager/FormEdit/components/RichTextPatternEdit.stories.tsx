import type { Meta, StoryObj } from '@storybook/react';

import { type RichTextPattern } from '@atj/forms/src/patterns/rich-text';
import { en as message } from '@atj/common/src/locales/en/app';

import { createPatternEditStoryMeta } from './common/story-helper';
import FormEdit from '..';
import { expect, userEvent } from '@storybook/test';
import { within } from '@testing-library/react';

const pattern: RichTextPattern = {
  id: '1',
  type: 'rich-text',
  data: {
    text: 'Rich text',
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

export const Error: StoryObj<typeof FormEdit> = {
  play: async ({ canvasElement }) => {
    userEvent.setup();

    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByText(message.patterns.richText.displayName)
    );

    const input = canvas.getByLabelText(message.patterns.richText.fieldLabel);

    // Clear input, remove focus, and wait for error
    await userEvent.clear(input);
    input.blur();

    await expect(
      await canvas.findByText(
        message.patterns.richText.errorTextMustContainChar
      )
    ).toBeInTheDocument();
  },
};
