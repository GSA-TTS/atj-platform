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
      defaultChecked={false}
      label="Option 1"
    />
    <RadioInput
      id="option-2"
      name="select-item"
      defaultChecked={false}
      label="Option 2"
    />
    <RadioInput
      id="option-3"
      name="select-item"
      defaultChecked={true}
      label="Option 3"
    />
  </RadioGroup>
);

export const Default = Template.bind({});
Default.args = {};
