import type { Meta, StoryObj } from '@storybook/react';

import { type FormService } from '@atj/forms';
import { createTestBrowserFormService } from '@atj/forms/context';
import FormRouter from './index.js';

export default {
  title: 'Form',
  component: FormRouter,
  args: {
    formService: createTestBrowserFormService() as FormService,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormRouter>;

export const FormRouterSample = {} satisfies StoryObj<typeof FormRouter>;
