import type { Meta, StoryObj } from '@storybook/react';

import AvailableFormList from '.';
import { service } from '@atj/forms';
import { createForm, nullSession } from '@atj/forms';
import { MemoryRouter } from 'react-router-dom';
import { FormManagerProvider } from '../FormManager/store';
import { createTestFormManagerContext } from '../test-form';
import React from 'react';

const meta: Meta<typeof AvailableFormList> = {
  title: 'FormManager/AvailableFormList',
  component: AvailableFormList,
  args: {
    formService: service.createTestFormService({
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
    formService: service.createTestFormService({}),
    urlForForm: () => `#`,
    urlForFormManager: () => `#`,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AvailableFormList>;

export const AvailableFormListDemo = {} satisfies StoryObj<
  typeof AvailableFormList
>;
