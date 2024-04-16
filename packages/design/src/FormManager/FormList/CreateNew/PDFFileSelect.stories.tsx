import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import CreateNew from '.';

export default {
  title: 'FormManager/FormList/CreateNew',
  component: CreateNew,
  decorators: [
    (Story, args) => (
      <MemoryRouter initialEntries={['/']}>
        <Story {...args} />
      </MemoryRouter>
    ),
  ],
  args: {
    baseUrl: '/',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CreateNew>;

export const CreateNewTest = {} satisfies StoryObj<typeof CreateNew>;
