import { Meta, Story } from '@storybook/react';

import RadioGroup, { RadioInput } from './RadioGroup';
import React from 'react';

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
} as Meta;

const Template: Story = () => (
  <RadioGroup legend="Select an item">
    <RadioInput
      id="option-1"
      name="select-item"
      defaultValue="option1"
      label="Option 1"
    />
    <RadioInput
      id="option-2"
      name="select-item"
      defaultValue="option2"
      label="Option 2"
    />
    <RadioInput
      id="option-3"
      name="select-item"
      defaultValue="option3"
      label="Option 3"
    />
  </RadioGroup>
);

export const Default = Template.bind({});
Default.args = {};
