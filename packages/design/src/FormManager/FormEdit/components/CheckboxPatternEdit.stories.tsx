import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent } from '@storybook/test';
import { within } from '@testing-library/react';

import { type CheckboxPattern } from '@atj/forms/src/patterns/checkbox';

import CheckboxPatternEdit from './CheckboxPatternEdit';
import { createPatternEditStoryMeta } from './common/story-helper';
import FormEdit from '..';
import { en as message } from '@atj/common/src/locales/en/app';

const pattern: CheckboxPattern = {
  id: '1',
  type: 'checkbox',
  data: {
    label: message.patterns.checkbox.displayName,
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
    const updatedLabel = 'Updated checkbox pattern';

    // Give focus to the field matching `currentLabel`
    await userEvent.click(
      await canvas.findByLabelText(message.patterns.checkbox.displayName)
    );
    const input = canvas.getByLabelText(message.patterns.checkbox.fieldLabel);

    // Enter new text for first field
    await userEvent.clear(input);
    await userEvent.type(input, updatedLabel);

    const form = input?.closest('form');
    /**
     * The <enter> key behavior outside of Storybook submits the form, which commits the pending edit.
     * Here, we want to simulate the <enter> keypress in the story since Storybook manipulates
     * the default behavior and eats the enter key if it's in the `userEvent.type` function arg.
     */
    form?.requestSubmit();

    await expect(await canvas.findByText(updatedLabel)).toBeInTheDocument();
  },
};

export const Error: StoryObj<typeof CheckboxPatternEdit> = {
  play: async ({ canvasElement }) => {
    userEvent.setup();

    const canvas = within(canvasElement);

    // Give focus to the field matching `currentLabel`
    await userEvent.click(
      await canvas.findByLabelText(message.patterns.checkbox.displayName)
    );

    // Enter new text for first field
    const input = canvas.getByLabelText(message.patterns.checkbox.fieldLabel);
    await userEvent.clear(input);
    input.blur();

    await expect(
      await canvas.findByText(
        message.patterns.checkbox.errorTextMustContainChar
      )
    ).toBeInTheDocument();
  },
};
