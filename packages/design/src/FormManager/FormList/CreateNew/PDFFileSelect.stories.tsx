import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import {
  createTwoPatternTestForm,
  createTestSession,
  createTestFormManagerContext,
} from '../../../test-form.js';
import { FormManagerProvider } from '../../store.js';
import CreateNew from './index.js';

const meta: Meta<typeof CreateNew> = {
  title: 'FormManager/FormList/CreateNew',
  component: CreateNew,
  decorators: [
    (Story, args) => (
      <MemoryRouter initialEntries={['/']}>
        <FormManagerProvider
          context={createTestFormManagerContext()}
          session={createTestSession({ form: createTwoPatternTestForm() })}
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
};

export default meta;
export const CreateNewTest = {} satisfies StoryObj<typeof CreateNew>;
