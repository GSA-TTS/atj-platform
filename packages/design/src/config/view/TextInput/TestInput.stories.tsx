import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/react';

import TextInput from '.';
import { Pattern, TextInputPattern } from '@atj/forms';

export default {
  title: 'patterns/TextInput',
  component: TextInput,
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
} satisfies Meta<typeof TextInput>;

export const Required = {
  args: {
    pattern: {
      _elementId: '',
      type: 'input',
      inputId: 'test-prompt',
      value: '',
      label: 'Please enter your first name.',
      required: true,
    } as Pattern<TextInputPattern>,
  },
} satisfies StoryObj<typeof TextInput>;

export const NotRequired = {
  args: {
    pattern: {
      _elementId: '',
      type: 'input',
      inputId: 'test-prompt',
      value: '',
      label: 'Please enter your first name.',
      required: false,
    } as Pattern<TextInputPattern>,
  },
} satisfies StoryObj<typeof TextInput>;
