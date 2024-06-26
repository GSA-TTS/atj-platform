import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import { service } from '@atj/forms';

import FormList from '.';
import {
  createTwoPatternTestForm,
  createTestFormManagerContext,
  createTestSession,
} from '../../test-form';
import { FormManagerProvider } from '../store';

const meta: Meta<typeof FormList> = {
  title: 'FormManager/FormList',
  component: FormList,
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
    formService: service.createTestFormService({
      'test-form': createTwoPatternTestForm(),
    }),
  },
  tags: ['autodocs'],
};

export default meta;
export const FormListFilled = {} satisfies StoryObj<typeof FormList>;
