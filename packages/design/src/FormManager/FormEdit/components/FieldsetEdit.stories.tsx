import type { Meta, StoryObj } from '@storybook/react';

import { type FieldsetPattern } from '@atj/forms/src/patterns/fieldset';

import { createPatternEditStoryMeta } from './common/story-helper';
import FormEdit from '..';

const pattern: FieldsetPattern = {
  id: '1',
  type: 'fieldset',
  data: {
    patterns: [],
  },
};

export default {
  title: 'Edit components/FieldsetPattern',
  ...createPatternEditStoryMeta({
    pattern,
  }),
} as Meta<typeof FormEdit>;

export const Basic: StoryObj<typeof FormEdit> = {};
