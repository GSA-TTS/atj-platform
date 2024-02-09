import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import { createTestFormService } from '@atj/form-service';

import { FormViewById } from '.';
import { createTestForm, createTestFormConfig } from '../../test-form';

export default {
  title: 'FormManager/FormView',
  component: FormViewById,
  decorators: [
    (Story, args) => (
      <MemoryRouter initialEntries={['/']}>
        <Story {...args} />
      </MemoryRouter>
    ),
  ],
  args: {
    config: createTestFormConfig(),
    formId: 'test-form',
    formService: createTestFormService({
      'test-form': createTestForm(),
    }),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormViewById>;

export const FormViewTest = {} satisfies StoryObj<typeof FormViewById>;
