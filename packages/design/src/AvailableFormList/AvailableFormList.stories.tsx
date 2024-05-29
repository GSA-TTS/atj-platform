import type { Meta, StoryObj } from '@storybook/react';

import AvailableFormList from '.';
import { createTestFormService } from '@atj/form-service';
import { createForm } from '@atj/forms';

export default {
  title: 'AvailableFormList',
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
  tags: ['autodocs'],
} satisfies Meta<typeof AvailableFormList>;

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
