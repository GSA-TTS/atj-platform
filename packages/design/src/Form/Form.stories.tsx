import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { createForm } from '@atj/forms';

import Form from '.';

export default {
  title: 'Form',
  component: Form,
  decorators: [(Story, args) => <Story {...args} />],
  args: {
    form: createForm(
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
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export const FormTest = {} satisfies StoryObj<typeof Form>;
