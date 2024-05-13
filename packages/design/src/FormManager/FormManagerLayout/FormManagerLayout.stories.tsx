import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import { FormManagerLayout, NavPage } from '.';
import {
  createTwoPatternTestForm,
  createTestFormManagerContext,
} from '../../test-form';
import { FormManagerProvider } from '../store';

export default {
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
} satisfies Meta<typeof FormManagerLayout>;

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
