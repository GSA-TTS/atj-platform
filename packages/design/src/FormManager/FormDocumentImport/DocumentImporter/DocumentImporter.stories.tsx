import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import DocumentImporter from '.';
import { createTestForm } from '../../../test-form';

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
    form: createTestForm(),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DocumentImporter>;

export const TestForm = {} satisfies StoryObj<typeof DocumentImporter>;
