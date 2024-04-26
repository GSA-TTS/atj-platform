import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import { FormPreview } from '.';
import {
  createTestForm,
  createTestFormContext,
  createTestFormManagerContext,
} from '../../test-form';
import { FormManagerProvider } from '../store';

export default {
  title: 'FormManager/FormPreview',
  component: FormPreview,
  decorators: [
    (Story, args) => (
      <MemoryRouter initialEntries={['/']}>
        <FormManagerProvider
          context={createTestFormManagerContext()}
          form={createTestForm()}
        >
          <Story {...args} />
        </FormManagerProvider>
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
