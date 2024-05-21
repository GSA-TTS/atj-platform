import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import { FormManagerLayout } from '.';
import {
  createTwoPatternTestForm,
  createTestFormManagerContext
} from '../../test-form';
import { FormManagerProvider } from '../store';
import { NavPage } from './TopNavigation';

const meta: Meta<typeof FormManagerLayout> = {
  title: 'FormManagerLayout',
  component: FormManagerLayout,
  decorators: [
    (Story, args) => (
      <MemoryRouter initialEntries={['/']}>
        <FormManagerProvider
          context={createTestFormManagerContext()}
          form={createTwoPatternTestForm()}
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
