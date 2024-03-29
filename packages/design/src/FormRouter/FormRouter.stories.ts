import type { Meta, StoryObj } from '@storybook/react';

import { createTestFormService } from '@atj/form-service';

import FormRouter from '.';

export default {
  title: 'Form',
  component: FormRouter,
  args: {
    formService: createTestFormService(),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormRouter>;

export const FormRouterSample = {} satisfies StoryObj<typeof FormRouter>;
