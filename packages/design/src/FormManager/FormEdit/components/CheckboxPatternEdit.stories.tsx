import type { Meta, StoryObj } from '@storybook/react';

import { type CheckboxPattern } from '@atj/forms';

import CheckboxPatternEdit from './CheckboxPatternEdit.js';
import {
  createPatternEditStoryMeta,
  testEmptyFormLabelError,
  testUpdateFormFieldOnSubmit,
} from './common/story-helper.js';
import FormEdit from '../index.js';
import { enLocale as message } from '@atj/common';

const pattern: CheckboxPattern = {
  id: '1',
  type: 'checkbox',
  data: {
    label: message.patterns.checkbox.displayName,
    defaultChecked: false,
  },
};

const storyConfig: Meta<typeof FormEdit> = {
  title: 'Edit components/CheckboxPatternEdit',
  ...createPatternEditStoryMeta({
    pattern,
  }),
};
export default storyConfig;

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
