import type { Meta, StoryObj } from '@storybook/react';

import AvailableFormList from '.';

export default {
  title: 'AvailableFormList',
  component: AvailableFormList,
  args: {
    forms: [
      {
        title: 'UD-105',
        description: 'Alabama name change',
        url: 'https://10x.gsa.gov',
      },
      {
        title: 'POS-030',
        description: 'California unlawful detainer',
        url: 'https://10x.gsa.gov',
      },
    ],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AvailableFormList>;

export const AvailableFormListDemo = {} satisfies StoryObj<
  typeof AvailableFormList
>;
