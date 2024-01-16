// Replace your-framework with the name of your framework
import type { Meta } from '@storybook/react';

import { createForm } from '@atj/forms';
import { createTestFormService } from '@atj/form-service';

import { FormSection } from '.';

export default {
  title: 'form/FormSection',
  component: FormSection,
  args: {},
  tags: ['autodocs'],
} satisfies Meta<typeof FormSection>;

export const TestForm = {};
