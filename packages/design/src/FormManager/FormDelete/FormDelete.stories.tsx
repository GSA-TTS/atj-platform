import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import { createForm } from '@atj/forms';
import { createTestFormService } from '@atj/form-service';

import FormDelete from '.';

export default {
  title: 'FormManager/FormDelete',
  component: FormDelete,
  decorators: [
    (Story, args) => (
      <MemoryRouter initialEntries={['/']}>
        <Story {...args} />
      </MemoryRouter>
    ),
  ],
  args: {
    formId: 'test-form',
    formService: createTestFormService({
      'test-form': createForm(
        {
          title: 'Test form',
          description: 'Test description',
        },
        [
          {
            id: 'element-1',
            text: 'FormElement 1',
            initial: '',
            required: true,
          },
          {
            id: 'element-2',
            text: 'FormElement 2',
            initial: 'initial value',
            required: false,
          },
        ]
      ),
    }),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormDelete>;

export const FormDeleteTest = {} satisfies StoryObj<typeof FormDelete>;
