// Replace your-framework with the name of your framework
import type { Meta } from '@storybook/react';

import FormManager from '.';

export default {
  title: 'form/FormManager',
  component: FormManager,
  args: {},
  tags: ['autodocs'],
} satisfies Meta<typeof FormManager>;

export const TestForm = {};
