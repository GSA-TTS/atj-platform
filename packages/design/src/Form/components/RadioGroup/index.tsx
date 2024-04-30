import React from 'react';

import { type RadioGroupProps } from '@atj/forms';

import { type PatternComponent } from '../../../Form';
import RadioGroup, { RadioInput } from './RadioGroup';

const RadioGroupPattern: PatternComponent<RadioGroupProps> = props => {
  return (
    <RadioGroup legend={props.legend}>
      {props.options.map((option, index) => (
        <RadioInput
          key={index}
          id={option.id}
          name={option.name}
          label={option.label}
          defaultChecked={option.defaultChecked}
        ></RadioInput>
      ))}
    </RadioGroup>
  );
};
export default RadioGroupPattern;
