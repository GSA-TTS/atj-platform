import type { Meta } from '@storybook/react';

import ActionBar from './index.js';

export default {
  title: 'FormManager/ActionBar',
  component: ActionBar,
  args: {
    actions: [
      {
        type: 'submit',
        text: 'Submit',
        submitAction: 'submit',
      },
    ],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ActionBar>;

export const ActionBarWithSubmitButton = {};
