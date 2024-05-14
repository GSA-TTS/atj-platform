import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent } from '@storybook/test';
import { within } from '@testing-library/react';

import { type CheckboxPattern } from '@atj/forms/src/patterns/checkbox';

import CheckboxPatternEdit from './CheckboxPatternEdit';
import { createPatternEditStoryMeta } from './common/story-helper';
import FormEdit from '..';

const pattern: CheckboxPattern = {
  id: '1',
  type: 'checkbox',
  data: {
    label: 'Checkbox pattern',
    defaultChecked: false,
  },
};

export default {
  title: 'Edit components/CheckboxPatternEdit',
  ...createPatternEditStoryMeta({
    pattern,
  }),
} as Meta<typeof FormEdit>;

export const Basic: StoryObj<typeof CheckboxPatternEdit> = {
  play: async ({ canvasElement }) => {
    userEvent.setup();

    const canvas = within(canvasElement);

    // Give focus to the field matching `currentLabel`
    await userEvent.click(await canvas.findByLabelText('Checkbox pattern'));

    // Enter new text for first field
    const input = canvas.getByLabelText('Field label');
    await userEvent.clear(input);
    await userEvent.type(input, 'Updated checkbox pattern{enter}');
  },
};

const mustContainCharacterErrorText =
  'String must contain at least 1 character(s)';
export const Error: StoryObj<typeof CheckboxPatternEdit> = {
  play: async ({ canvasElement }) => {
    userEvent.setup();

    const canvas = within(canvasElement);

    // Give focus to the field matching `currentLabel`
    await userEvent.click(await canvas.findByLabelText('Checkbox pattern'));

    // Enter new text for first field
    const input = canvas.getByLabelText('Field label');
    await userEvent.clear(input);
    input.blur();

    await expect(
      await canvas.findByText(mustContainCharacterErrorText)
    ).toBeInTheDocument();
  },
};
