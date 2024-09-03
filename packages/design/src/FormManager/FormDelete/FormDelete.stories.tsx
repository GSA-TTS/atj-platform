import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import { createTestBrowserFormService } from '@atj/forms/context';

import { createTwoPatternTestForm } from '../../test-form.js';
import FormDelete from './index.js';

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
    formService: createTestBrowserFormService({
      'test-form': createTwoPatternTestForm(),
    }),
  },
  tags: ['autodocs'],
};

export default meta;
export const FormDeleteTest = {} satisfies StoryObj<typeof FormDelete>;
