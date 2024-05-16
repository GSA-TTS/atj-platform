import type { Meta, StoryObj } from '@storybook/react';

import { type InputPattern } from '@atj/forms/src/patterns/input';

import { createPatternEditStoryMeta } from './common/story-helper';
import FormEdit from '..';
import { en as message } from '@atj/common/src/locales/en/app';
import { expect, userEvent } from '@storybook/test';
import { within } from '@testing-library/react';

const pattern: InputPattern = {
  id: '1',
  type: 'input',
  data: {
    label: message.patterns.input.displayName,
    required: true,
    maxLength: 128,
  },
};

export default {
  title: 'Edit components/InputPattern',
  ...createPatternEditStoryMeta({
    pattern,
  }),
} as Meta<typeof FormEdit>;

export const Basic: StoryObj<typeof FormEdit> = {};

export const Error: StoryObj<typeof FormEdit> = {
  play: async ({ canvasElement }) => {
    userEvent.setup();

    const canvas = within(canvasElement);

    // Give focus to the field matching `currentLabel`
    await userEvent.click(
      await canvas.findByLabelText(message.patterns.input.displayName)
    );
    const input = canvas.getByLabelText(message.patterns.input.fieldLabel);

    // Enter new text for first field
    await userEvent.clear(input);
    input.blur();

    await expect(
      await canvas.findByText(message.patterns.input.fieldRequired)
    ).toBeInTheDocument();
  },
};
