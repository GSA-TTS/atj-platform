// Replace your-framework with the name of your framework
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryFn } from '@storybook/react';

import { createForm } from '@atj/forms';

import DocumentImporter from '.';

export default {
  title: 'form-builder/DocumentImporter',
  component: DocumentImporter,
  decorators: [
    (Story: StoryFn, args: any) => (
      <MemoryRouter initialEntries={['/']}>
        <Story {...args} />
      </MemoryRouter>
    ),
  ],
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
