import React from 'react';
import { useFormContext } from 'react-hook-form';

import { type RadioGroupProps } from '@atj/forms';

import { type PatternComponent } from '../../../Form';
/*
const RadioGroupPatternOld: PatternComponent<RadioGroupProps> = props => {
  const { register } = useFormContext();
  return (
    <RadioGroup legend={props.legend}>
      {props.options.map((option, index) => (
        <RadioInput
          key={index}
          id={option.id}
          label={option.label}
          defaultChecked={option.defaultChecked}
          {...register(option.id)}
        ></RadioInput>
      ))}
    </RadioGroup>
  );
};
*/
const RadioGroupPattern: PatternComponent<RadioGroupProps> = props => {
  const { register } = useFormContext();
  return (
    <div className="usa-fieldset">
      <legend className="usa-legend text-bold">{props.legend}</legend>
      {props.options.map((option, index) => {
        return (
          <div key={index} className="usa-radio">
            <input
              className="usa-radio__input"
              type="radio"
              id={option.id}
              {...register(props._patternId)}
              value={option.id}
            />
            <label htmlFor={option.id} className="usa-radio__label">
              {option.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};
export default RadioGroupPattern;
