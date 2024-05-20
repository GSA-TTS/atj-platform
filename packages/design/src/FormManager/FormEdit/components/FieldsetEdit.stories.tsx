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

const storyConfig: Meta = {
  title: 'Edit components/FieldsetPattern',
  ...createPatternEditStoryMeta({
    pattern,
  }),
} as Meta<typeof FormEdit>;
export default storyConfig;

export const Basic: StoryObj<typeof FormEdit> = {};
