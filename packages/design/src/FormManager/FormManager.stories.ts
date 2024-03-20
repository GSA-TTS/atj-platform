// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/react';

import { createTestFormService } from '@atj/form-service';

import FormManager from '.';

export default {
  title: 'form/FormManager',
  component: FormManager,
  args: {
    formService: createTestFormService(),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormManager>;

export const TestForm: StoryObj = {};
