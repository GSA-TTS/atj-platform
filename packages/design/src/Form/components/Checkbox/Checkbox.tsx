import React from 'react';
import { useFormContext } from 'react-hook-form';

import { type CheckboxProps } from '@atj/forms';

import { type PatternComponent } from '../../../Form';

export const CheckboxPattern: PatternComponent<CheckboxProps> = props => {
  const { register } = useFormContext();
  return (
    <div className="usa-checkbox">
      <input
        id={props.id}
        type="checkbox"
        className="usa-checkbox__input"
        {...register(props.id)}
      />
      <label className="usa-checkbox__label" htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
};
