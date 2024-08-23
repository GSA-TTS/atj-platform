import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import { createForm, createTestFormService, nullSession } from '@atj/forms';
import { FormManagerProvider } from '../FormManager/store.js';
import { createTestFormManagerContext } from '../test-form.js';
import AvailableFormList from './index.js';

const meta: Meta<typeof AvailableFormList> = {
  title: 'FormManager/AvailableFormList',
  component: AvailableFormList,
  args: {
    formService: createTestFormService({
      'form-1': createForm({
        title: 'Form 1',
        description: 'Use this form to...',
      }),
      'form-2': createForm({
        title: 'Form 2',
        description: 'Use this form to...',
      }),
    }),
    urlForForm: () => `#`,
    urlForFormManager: () => `#`,
  },
  decorators: [
    (Story, args) => (
      <MemoryRouter initialEntries={['/']}>
        <FormManagerProvider
          context={createTestFormManagerContext()}
          session={nullSession}
        >
          <Story {...args} />
        </FormManagerProvider>
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

export const Empty = {
  title: 'Empty form list',
  component: AvailableFormList,
  args: {
    formService: createTestFormService({}),
    urlForForm: () => `#`,
    urlForFormManager: () => `#`,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AvailableFormList>;

export const AvailableFormListDemo = {} satisfies StoryObj<
  typeof AvailableFormList
>;
