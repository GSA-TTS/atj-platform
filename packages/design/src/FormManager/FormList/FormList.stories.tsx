import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import { createTestFormService } from '@atj/form-service';

import FormList from '.';
import { createTestForm } from '../../test-form';

export default {
  title: 'FormManager/FormList',
  component: FormList,
  decorators: [
    (Story, args) => (
      <MemoryRouter initialEntries={['/']}>
        <Story {...args} />
      </MemoryRouter>
    ),
  ],
  args: {
    formService: createTestFormService({
      'test-form': createTestForm(),
    }),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormList>;

export const FormListFilled = {} satisfies StoryObj<typeof FormList>;
