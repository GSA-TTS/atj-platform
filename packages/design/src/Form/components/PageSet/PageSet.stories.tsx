import type { Meta, StoryObj } from '@storybook/react';

import PageSet from './PageSet';

export default {
  title: 'patterns/PageSet',
  component: PageSet,
  tags: ['autodocs'],
} satisfies Meta<typeof PageSet>;

export const Basic = {
  args: {
    _patternId: 'test-id',
    type: 'page-set',
    pages: [
      {
        title: 'First page',
        active: false,
      },
      {
        title: 'Second page',
        active: true,
      },
    ],
  },
} satisfies StoryObj<typeof PageSet>;
