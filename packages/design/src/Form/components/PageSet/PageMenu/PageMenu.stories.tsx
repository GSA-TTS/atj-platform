import type { Meta, StoryObj } from '@storybook/react';

import { PageMenu } from './PageMenu';

const meta: Meta<typeof PageMenu> = {
  title: 'patterns/PageSet/PageMenu',
  component: PageMenu,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof PageMenu> = {
  args: {
    pages: [
      {
        selected: false,
        title: 'First page',
        url: '',
      },
      {
        selected: true,
        title: 'Second page',
        url: '',
      },
    ],
  },
};
