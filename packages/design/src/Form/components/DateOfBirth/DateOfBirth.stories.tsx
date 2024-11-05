import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { type Meta, type StoryObj } from '@storybook/react';

import { DateOfBirthPattern } from './DateOfBirth.js';

const meta: Meta<typeof DateOfBirthPattern> = {
  title: 'patterns/DateOfBirthPattern',
  component: DateOfBirthPattern,
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

export const Default: StoryObj<typeof DateOfBirthPattern> = {
  args: {
    _patternId: '',
    type: 'date-of-birth',
    selectId: 'date-of-birth-1',
    label: 'Select a date of birth',
    hint: 'For example: January 19, 2000',
    required: false,
  },
};

export const WithoutHint: StoryObj<typeof DateOfBirthPattern> = {
  args: {
    _patternId: '',
    type: 'date-of-birth',
    selectId: 'date-of-birth-without-hint',
    label: 'Select a date of birth',
    hint: '',
    required: false,
  },
};

export const WithError: StoryObj<typeof DateOfBirthPattern> = {
  args: {
    _patternId: '',
    type: 'date-of-birth',
    selectId: 'date-of-birth-with-error',
    label: 'Select a date of birth with error',
    hint: 'For example: January 19, 2000',
    required: false,
    error: {
      type: 'custom',
      message: 'This field has an error',
    },
  },
};

export const Required: StoryObj<typeof DateOfBirthPattern> = {
  args: {
    _patternId: '',
    type: 'date-of-birth',
    selectId: 'date-of-birth-required',
    label: 'Select a required date of birth',
    hint: 'For example: January 19, 2000',
    required: true,
  },
};
