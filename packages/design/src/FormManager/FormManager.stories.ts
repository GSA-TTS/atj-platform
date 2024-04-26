// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/react';

import FormManager from '.';
import { createTestFormManagerContext } from '../test-form';

export default {
  title: 'form/FormManager',
  component: FormManager,
  args: {
    context: createTestFormManagerContext(),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormManager>;

export const TestForm: StoryObj = {};
