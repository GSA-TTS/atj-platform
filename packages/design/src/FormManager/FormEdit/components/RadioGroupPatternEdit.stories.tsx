import type { Meta, StoryObj } from '@storybook/react';

import { type RadioGroupPattern } from '@atj/forms/src/patterns/radio-group';

import { createPatternEditStoryMeta } from './common/story-helper';
import FormEdit from '..';
import CheckboxPatternEdit from './CheckboxPatternEdit';
import { en as message } from '@atj/common/src/locales/en/app';
import { expect, userEvent } from '@storybook/test';
import { within } from '@testing-library/react';

const pattern: RadioGroupPattern = {
  id: '1',
  type: 'radioGroup',
  data: {
    label: message.patterns.radioGroup.displayName,
    options: [
      { label: 'Option 1', id: '1' },
      { label: 'Option 2', id: '2' },
      { label: 'Option 3', id: '3' },
    ],
  },
};

export default {
  title: 'Edit components/RadioGroupPattern',
  ...createPatternEditStoryMeta({
    pattern,
  }),
} as Meta<typeof FormEdit>;

export const Basic: StoryObj<typeof FormEdit> = {
  play: async ({ canvasElement }) => {},
};

export const Error: StoryObj<typeof CheckboxPatternEdit> = {
  play: async ({ canvasElement }) => {
    userEvent.setup();

    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByText(message.patterns.radioGroup.displayName)
    );

    const input = canvas.getByLabelText(message.patterns.radioGroup.fieldLabel);
    const optionVal = canvas.getByLabelText('Option 1 id');
    const optionText = canvas.getByLabelText('Option 1 label');

    // Clear input, remove focus, and wait for error
    await userEvent.clear(input);
    input.blur();

    await expect(
      await canvas.findByText(
        message.patterns.radioGroup.errorTextMustContainChar
      )
    ).toBeInTheDocument();

    /*
      Repopulate the input value since the error text is indistinguishable from
      the error text from the option label below
    */
    await userEvent.type(input, message.patterns.radioGroup.fieldLabel);

    await userEvent.clear(optionVal);
    optionVal.blur();

    await expect(
      await canvas.findByText('Invalid option ID')
    ).toBeInTheDocument();

    await userEvent.clear(optionText);
    optionText.blur();

    await expect(
      await canvas.findByText(
        message.patterns.radioGroup.errorTextMustContainChar
      )
    ).toBeInTheDocument();

    await userEvent.clear(input);
    input.blur();
  },
};
