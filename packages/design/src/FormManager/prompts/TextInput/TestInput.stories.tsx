import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import TextInput, { TextInputProps } from '.';

const FormDecorator = ({ Story, args }: { Story: StoryFn; args: any }) => {
  const formMethods = useForm();
  return (
    <FormProvider {...formMethods}>
      <Story {...args} />
    </FormProvider>
  );
};

export default {
  title: 'prompts/TextInput',
  component: TextInput,
  decorators: [
    (Story: StoryFn, args: any) => {
      return <FormDecorator Story={Story} args={args} />;
    },
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof TextInput>;

export const Required = {
  args: {
    prompt: {
      type: 'text',
      id: 'test-prompt',
      value: '',
      label: 'Please enter your first name.',
      required: true,
    },
  } satisfies TextInputProps,
} satisfies StoryObj<typeof TextInput>;

export const NotRequired = {
  args: {
    prompt: {
      type: 'text',
      id: 'test-prompt',
      value: '',
      label: 'Please enter your first name.',
      required: false,
    },
  } satisfies TextInputProps,
} satisfies StoryObj<typeof TextInput>;
