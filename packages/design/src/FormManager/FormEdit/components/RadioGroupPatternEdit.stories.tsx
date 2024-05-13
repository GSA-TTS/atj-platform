import type { Meta, StoryObj } from '@storybook/react';

import { type RadioGroupPattern } from '@atj/forms/src/patterns/radio-group';

import { createPatternEditStoryMeta } from './common/story-helper';
import FormEdit from '..';

const pattern: RadioGroupPattern = {
  id: '1',
  type: 'radioGroup',
  data: {
    label: 'Radio group label',
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

export const Basic: StoryObj<typeof FormEdit> = {};
