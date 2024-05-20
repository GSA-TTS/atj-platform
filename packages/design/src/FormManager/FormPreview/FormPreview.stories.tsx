import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import { FormPreview } from '.';
import {
  createTwoPatternTestForm,
  createTestFormContext,
  createTestFormManagerContext,
} from '../../test-form';
import { FormManagerProvider } from '../store';

const meta: Meta<typeof FormPreview> = {
  title: 'FormManager/FormPreview',
  component: FormPreview,
  decorators: [
    (Story, args) => (
      <MemoryRouter initialEntries={['/']}>
        <FormManagerProvider
          context={createTestFormManagerContext()}
          form={createTwoPatternTestForm()}
        >
          <Story {...args} />
        </FormManagerProvider>
      </MemoryRouter>
    ),
  ],
  args: {
    context: createTestFormContext(),
    form: createTwoPatternTestForm(),
  },
  tags: ['autodocs'],
};

export default meta;

export const FormViewTest = {} satisfies StoryObj<typeof FormPreview>;
