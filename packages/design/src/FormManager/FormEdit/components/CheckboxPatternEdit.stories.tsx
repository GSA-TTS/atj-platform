import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent } from '@storybook/test';
import { within } from '@testing-library/react';

import { type CheckboxPattern } from '@atj/forms/src/patterns/checkbox';

import CheckboxPatternEdit from './CheckboxPatternEdit';
import {
  createPatternEditStoryMeta,
  testEmptyFormLabelError,
  testUpdateFormFieldOnSubmit,
} from './common/story-helper';
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
    await testUpdateFormFieldOnSubmit(
      canvasElement,
      message.patterns.checkbox.displayName,
      message.patterns.checkbox.fieldLabel,
      'Updated checkbox pattern'
    );
  },
};

export const Error: StoryObj<typeof CheckboxPatternEdit> = {
  play: async ({ canvasElement }) => {
    await testEmptyFormLabelError(
      canvasElement,
      message.patterns.checkbox.displayName,
      message.patterns.checkbox.fieldLabel,
      message.patterns.checkbox.errorTextMustContainChar
    );
  },
};
