// Replace your-framework with the name of your framework
import type { Meta } from '@storybook/react';

import { FormSection } from '.';

export default {
  title: 'form/FormSection',
  component: FormSection,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof FormSection>;

export const TestForm = {};
