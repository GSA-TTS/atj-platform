import type { Meta, StoryObj } from '@storybook/react';

import { type InputPattern } from '@atj/forms/src/patterns/input';

import {
  createPatternEditStoryMeta,
  testEmptyFormLabelError,
  testUpdateFormFieldOnSubmit,
} from './common/story-helper';
import FormEdit from '..';
import { en as message } from '@atj/common/src/locales/en/app';

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
