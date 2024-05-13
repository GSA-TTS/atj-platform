import type { Meta, StoryObj } from '@storybook/react';

import { type InputPattern } from '@atj/forms/src/patterns/input';

import { createPatternEditStoryMeta } from './common/story-helper';
import FormEdit from '..';

const pattern: InputPattern = {
  id: '1',
  type: 'input',
  data: {
    label: 'Input label',
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
