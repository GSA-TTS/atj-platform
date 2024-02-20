import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Form from '.';
import { createTestFormConfig, createTestSession } from '../test-form';

export default {
  title: 'Form',
  component: Form,
  decorators: [(Story, args) => <Story {...args} />],
  args: {
    config: createTestFormConfig(),
    session: createTestSession(),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export const FormTest = {} satisfies StoryObj<typeof Form>;
