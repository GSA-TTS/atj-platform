import type { Meta, StoryObj } from '@storybook/react';

import { Toolbar } from './index.js';
import { createTestFormContext } from '../../../test-form.js';

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
