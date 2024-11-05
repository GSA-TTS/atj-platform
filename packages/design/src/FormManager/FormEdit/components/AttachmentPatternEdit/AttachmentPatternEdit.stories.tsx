import type { Meta, StoryObj } from '@storybook/react';

import { enLocale as message } from '@atj/common';
import { type AttachmentPattern } from '@atj/forms';

import {
  createPatternEditStoryMeta,
  testEmptyFormLabelError,
  testUpdateFormFieldOnSubmit,
} from '../common/story-helper.js';
import FormEdit from '../../index.js';

const pattern: AttachmentPattern = {
  id: '1',
  type: 'attachment',
  data: {
    label: message.patterns.attachment.displayName,
    required: true,
    maxLength: 128,
  },
};

const storyConfig: Meta = {
  title: 'Edit components/AttachmentPattern',
  ...createPatternEditStoryMeta({
    pattern,
  }),
} as Meta<typeof FormEdit>;
export default storyConfig;

export const Basic: StoryObj<typeof FormEdit> = {
  play: async ({ canvasElement }) => {
    await testUpdateFormFieldOnSubmit(
      canvasElement,
      message.patterns.attachment.displayName,
      message.patterns.attachment.fieldLabel,
      'Updated attachment pattern'
    );
  },
};

export const Error: StoryObj<typeof FormEdit> = {
  play: async ({ canvasElement }) => {
    await testEmptyFormLabelError(
      canvasElement,
      message.patterns.attachment.displayName,
      message.patterns.attachment.fieldLabel,
      message.patterns.attachment.fieldLabelRequired
    );
  },
};
