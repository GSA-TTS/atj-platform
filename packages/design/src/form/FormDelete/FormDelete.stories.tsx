import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { createForm } from '@atj/forms';
import { createTestFormService } from '@atj/form-service';

import FormDelete from '.';

export default {
  title: 'form/FormDelete',
  component: FormDelete,
  decorators: [
    (Story: StoryFn, args: any) => (
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
            id: 'question-1',
            text: 'Question 1',
            initial: '',
            required: true,
          },
          {
            id: 'question-2',
            text: 'Question 2',
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
