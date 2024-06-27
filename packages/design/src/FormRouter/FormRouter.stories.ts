import type { Meta, StoryObj } from '@storybook/react';

import { service } from '@atj/forms';

import FormRouter from '.';

export default {
  title: 'Form',
  component: FormRouter,
  args: {
    formService: service.createTestFormService(),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormRouter>;

export const FormRouterSample = {} satisfies StoryObj<typeof FormRouter>;
