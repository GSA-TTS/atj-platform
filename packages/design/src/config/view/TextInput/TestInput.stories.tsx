import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/react';

import TextInput, { TextInputProps } from '.';
import { Pattern, TextInputPattern } from '@atj/forms';

export default {
  title: 'prompts/TextInput',
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
    prompt: {
      _elementId: '',
      type: 'text',
      inputId: 'test-prompt',
      value: '',
      label: 'Please enter your first name.',
      required: true,
    } as Pattern<TextInputPattern>,
  } satisfies TextInputProps,
} satisfies StoryObj<typeof TextInput>;

export const NotRequired = {
  args: {
    prompt: {
      _elementId: '',
      type: 'text',
      inputId: 'test-prompt',
      value: '',
      label: 'Please enter your first name.',
      required: false,
    } as Pattern<TextInputPattern>,
  } satisfies TextInputProps,
} satisfies StoryObj<typeof TextInput>;
