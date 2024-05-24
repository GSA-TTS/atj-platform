import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Form from '.';
import { createTestFormContext, createTestSession } from '../test-form';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof Form> = {
  title: 'Form',
  component: Form,
  decorators: [
    (Story, args) => (
      <MemoryRouter initialEntries={['/']}>
        <Story {...args} />
      </MemoryRouter>
    ),
  ],
  args: {
    context: createTestFormContext(),
    session: createTestSession(),
  },
  tags: ['autodocs'],
};

export default meta;
export const FormTest = {} satisfies StoryObj<typeof Form>;
