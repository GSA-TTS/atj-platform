import type { Meta, StoryObj } from '@storybook/react';

import { type ParagraphPattern } from '@atj/forms/src/patterns/paragraph';

import { createPatternEditStoryMeta } from './common/story-helper';
import FormEdit from '..';

const pattern: ParagraphPattern = {
  id: '1',
  type: 'paragraph',
  data: {
    text: 'Lorem ipsum...',
  },
};

export default {
  title: 'Edit components/ParagraphPattern',
  ...createPatternEditStoryMeta({
    pattern,
  }),
} as Meta<typeof FormEdit>;

export const Basic: StoryObj<typeof FormEdit> = {};
