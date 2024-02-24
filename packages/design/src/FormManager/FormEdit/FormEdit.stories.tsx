import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import { createTestFormService } from '@atj/form-service';

import FormEdit from '.';
import { createTestForm, createTestFormEditContext } from '../../test-form';

export default {
  title: 'FormManager/FormEdit',
  component: FormEdit,
  decorators: [
    (Story, args) => (
      <MemoryRouter initialEntries={['/']}>
        <Story {...args} />
      </MemoryRouter>
    ),
  ],
  args: {
    context: createTestFormEditContext(),
    formId: 'test-form',
    formService: createTestFormService({
      'test-form': createTestForm(),
    }),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormEdit>;

export const FormEditTest = {} satisfies StoryObj<typeof FormEdit>;
