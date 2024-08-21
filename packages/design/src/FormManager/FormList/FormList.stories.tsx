import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import FormList from '.';
import {
  createTwoPatternTestForm,
  createTestSession,
  createTestFormManagerContext,
} from '../../test-form';
import { FormManagerProvider } from '../store';
import { createTestFormService } from '@atj/forms';

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
    formService: createTestFormService({
      'test-form': createTwoPatternTestForm(),
    }),
  },
  tags: ['autodocs'],
};

export default meta;
export const FormListFilled = {} satisfies StoryObj<typeof FormList>;
