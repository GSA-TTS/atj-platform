import type { Meta, StoryObj } from '@storybook/react';

import FormRouter from '.';
import { createTestFormService } from '@atj/forms';

export default {
  title: 'Form',
  component: FormRouter,
  args: {
    formService: createTestFormService(),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormRouter>;

export const FormRouterSample = {} satisfies StoryObj<typeof FormRouter>;
