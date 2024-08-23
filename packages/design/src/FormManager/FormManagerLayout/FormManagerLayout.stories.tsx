import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import { FormManagerLayout } from './index.js';
import {
  createTwoPatternTestForm,
  createTestSession,
  createTestFormManagerContext,
} from '../../test-form.js';
import { FormManagerProvider } from '../store.js';
import { NavPage } from './TopNavigation.js';

const meta: Meta<typeof FormManagerLayout> = {
  title: 'FormManagerLayout',
  component: FormManagerLayout,
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
  args: {},
  tags: ['autodocs'],
};

export default meta;
export const Configure = {
  args: {
    step: NavPage.configure,
    next: '#',
  },
} satisfies StoryObj<typeof FormManagerLayout>;

export const Create = {
  args: {
    step: NavPage.create,
    next: '#',
    back: '#',
    preview: '#',
  },
} satisfies StoryObj<typeof FormManagerLayout>;

export const Publish = {
  args: {
    step: NavPage.publish,
    next: '#',
    back: '#',
    preview: '#',
  },
} satisfies StoryObj<typeof FormManagerLayout>;

export const Upload = {
  args: {
    step: NavPage.upload,
    next: '#',
    back: '#',
    preview: '#',
  },
} satisfies StoryObj<typeof FormManagerLayout>;
