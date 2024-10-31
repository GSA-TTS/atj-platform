import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/react';

import Attachment from './index.js';

const meta: Meta<typeof Attachment> = {
  title: 'patterns/Attachment',
  component: Attachment,
  decorators: [
    (Story, args) => {
      const FormDecorator = () => {
        const formMethods = useForm();
        return (
          <FormProvider {...formMethods}>
            <Story {...args} />
          </FormProvider>
        );
      };
      return <FormDecorator />;
    },
  ],
  tags: ['autodocs'],
};

export default meta;
export const Required = {
  args: {
    _patternId: '',
    type: 'attachment',
    inputId: 'test-prompt',
    value: '',
    label: 'File upload',
    required: true,
  },
} satisfies StoryObj<typeof Attachment>;

export const NotRequired = {
  args: {
    _patternId: '',
    type: 'attachment',
    inputId: 'test-prompt',
    value: '',
    label: 'File upload',
    required: false,
  },
} satisfies StoryObj<typeof Attachment>;
