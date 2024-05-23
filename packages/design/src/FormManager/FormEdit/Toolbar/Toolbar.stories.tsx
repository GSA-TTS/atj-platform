import type { Meta, StoryObj } from '@storybook/react';

import { Toolbar } from '.';
import { createTestFormContext } from '../../../test-form';

const meta: Meta<typeof Toolbar> = {
  title: 'FormManager/Toolbar',
  component: Toolbar,
  decorators: [],
  args: {
    uswdsRoot: createTestFormContext().uswdsRoot,
  },
  tags: ['autodocs'],
};

export default meta;
export const Basic: StoryObj<typeof Toolbar> = {};
