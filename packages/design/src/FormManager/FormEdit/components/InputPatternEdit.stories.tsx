import type { Meta, StoryObj } from '@storybook/react';

import { enLocale as message } from '@atj/common';
import { type InputPattern } from '@atj/forms';

import {
  createPatternEditStoryMeta,
  testEmptyFormLabelError,
  testUpdateFormFieldOnSubmit,
} from './common/story-helper.js';
import FormEdit from '../index.js';

const pattern: InputPattern = {
  id: '1',
  type: 'input',
  data: {
    label: message.patterns.input.displayName,
    required: true,
    maxLength: 128,
  },
};

const storyConfig: Meta = {
  title: 'Edit components/InputPattern',
  ...createPatternEditStoryMeta({
    pattern,
  }),
} as Meta<typeof FormEdit>;
export default storyConfig;

export const Basic: StoryObj<typeof FormEdit> = {
  play: async ({ canvasElement }) => {
    await testUpdateFormFieldOnSubmit(
      canvasElement,
      message.patterns.input.displayName,
      message.patterns.input.fieldLabel,
      'Updated input pattern'
    );
  },
};

export const Error: StoryObj<typeof FormEdit> = {
  play: async ({ canvasElement }) => {
    await testEmptyFormLabelError(
      canvasElement,
      message.patterns.input.displayName,
      message.patterns.input.fieldLabel,
      message.patterns.input.fieldLabelRequired
    );
  },
};
