import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import { createTestFormService } from '@atj/form-service';

import FormDelete from '.';
import { createTwoPatternTestForm } from '../../test-form';

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
      'test-form': createTwoPatternTestForm(),
    }),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormDelete>;

export const FormDeleteTest = {} satisfies StoryObj<typeof FormDelete>;
