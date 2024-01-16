// Replace your-framework with the name of your framework
import type { Meta } from '@storybook/react';

import { createForm } from '@atj/forms';

import DocumentImporter from './DocumentImporter';

export default {
  title: 'form-builder/DocumentImporter',
  component: DocumentImporter,
  parameters: {
    formId: 'test-id',
    form: createForm(
      {
        title: '10x Test Form',
        description: 'This is a sample form being testing via Storybook',
      },
      [
        {
          id: 'full-name',
          text: 'Full name',
          initial: '',
          required: true,
        },
      ]
    ),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DocumentImporter>;

export const TestForm = {};
