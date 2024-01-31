import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';

import PDFFileSelect from '.';

export default {
  title: 'FormManager/FormList/PDFFileSelect',
  component: PDFFileSelect,
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
} satisfies Meta<typeof PDFFileSelect>;

export const PDFFileSelectTest = {} satisfies StoryObj<typeof PDFFileSelect>;
