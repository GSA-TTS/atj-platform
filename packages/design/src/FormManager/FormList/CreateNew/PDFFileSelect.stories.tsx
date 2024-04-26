import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import {
  createTestForm,
  createTestFormManagerContext,
} from '../../../test-form';
import { FormManagerProvider } from '../../store';
import CreateNew from '.';

export default {
  title: 'FormManager/FormList/CreateNew',
  component: CreateNew,
  decorators: [
    (Story, args) => (
      <MemoryRouter initialEntries={['/']}>
        <FormManagerProvider
          context={createTestFormManagerContext()}
          form={createTestForm()}
        >
          <Story {...args} />
        </FormManagerProvider>
      </MemoryRouter>
    ),
  ],
  args: {
    baseUrl: '/',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CreateNew>;

export const CreateNewTest = {} satisfies StoryObj<typeof CreateNew>;
