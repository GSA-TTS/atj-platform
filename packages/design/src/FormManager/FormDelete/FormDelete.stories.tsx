import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import FormDelete from '.';
import { createTwoPatternTestForm } from '../../test-form';
import { createTestFormService } from '@atj/forms';

const meta: Meta<typeof FormDelete> = {
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
};

export default meta;
export const FormDeleteTest = {} satisfies StoryObj<typeof FormDelete>;
