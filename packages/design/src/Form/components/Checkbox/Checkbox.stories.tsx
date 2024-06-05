import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { type Meta, type StoryObj } from '@storybook/react';

import { CheckboxPattern } from './Checkbox';
import { CheckboxProps } from '@atj/forms';

const meta: Meta<typeof CheckboxPattern> = {
  title: 'patterns/CheckboxPattern',
  component: CheckboxPattern,
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

export const Default = {
  args: {
    _patternId: '',
    type: 'checkbox',
    id: 'checkbox-1',
    label: 'Checkbox 1',
    defaultChecked: true,
  } satisfies CheckboxProps,
} satisfies StoryObj<typeof CheckboxPattern>;
