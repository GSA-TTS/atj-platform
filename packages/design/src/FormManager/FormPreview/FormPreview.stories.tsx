import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import FormPreview from '.';
import { createTestForm, createTestFormContext } from '../../test-form';

export default {
  title: 'FormManager/FormPreview',
  component: FormPreview,
  decorators: [
    (Story, args) => (
      <MemoryRouter initialEntries={['/']}>
        <Story {...args} />
      </MemoryRouter>
    ),
  ],
  args: {
    context: createTestFormContext(),
    form: createTestForm(),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormPreview>;

export const FormViewTest = {} satisfies StoryObj<typeof FormPreview>;
