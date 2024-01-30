import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import { createForm } from '@atj/forms';

import DocumentImporter from '.';

export default {
  title: 'FormManager/DocumentImporter',
  component: DocumentImporter,
  decorators: [
    (Story, args) => (
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

export const TestForm = {} satisfies StoryObj<typeof DocumentImporter>;
