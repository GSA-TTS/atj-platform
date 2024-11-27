import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { type Meta, type StoryObj } from '@storybook/react';
import { GenderIdPattern } from './GenderId.js';

const meta: Meta<typeof GenderIdPattern> = {
  title: 'patterns/GenderIdPattern',
  component: GenderIdPattern,
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

export const Default: StoryObj<typeof GenderIdPattern> = {
  args: {
    genderId: 'gender-identity',
    label: 'Gender identity',
    hint: 'For example, man, woman, non-binary',
    required: false,
    preferNotToAnswerText: 'Prefer not to share my gender identity',
  },
};

export const WithRequired: StoryObj<typeof GenderIdPattern> = {
  args: {
    genderId: 'gender-identity',
    label: 'Gender identity',
    hint: 'For example, man, woman, non-binary',
    required: true,
    preferNotToAnswerText: 'Prefer not to share my gender identity',
  },
};

export const WithError: StoryObj<typeof GenderIdPattern> = {
  args: {
    genderId: 'gender-identity',
    label: 'Gender identity with error',
    hint: 'For example, man, woman, non-binary',
    required: true,
    error: {
      type: 'custom',
      message: 'This field has an error',
    },
    preferNotToAnswerText: 'Prefer not to share my gender identity',
  },
};

export const WithHint: StoryObj<typeof GenderIdPattern> = {
  args: {
    genderId: 'gender-identity',
    label: 'Gender identity',
    hint: 'For example, man, woman, non-binary',
    required: true,
    preferNotToAnswerText: 'Prefer not to share my gender identity',
  },
};

export const WithCheckboxChecked: StoryObj<typeof GenderIdPattern> = {
  args: {
    genderId: 'gender-identity',
    label: 'Gender identity',
    hint: 'For example, man, woman, non-binary',
    required: false,
    preferNotToAnswerText: 'Prefer not to share my gender identity',
    preferNotToAnswerChecked: true,
  },
};

export const WithoutPreferNotToAnswerText: StoryObj<typeof GenderIdPattern> = {
  args: {
    genderId: 'gender-identity',
    label: 'Gender identity',
    hint: 'For example, man, woman, non-binary',
    required: false,
    preferNotToAnswerText: undefined,
  },
};
