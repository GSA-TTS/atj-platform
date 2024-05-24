import classNames from 'classnames';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { type TextInputProps } from '@atj/forms';
import { type PatternComponent } from '../../../Form';

const TextInput: PatternComponent<TextInputProps> = props => {
  const { register } = useFormContext();
  return (
    <div className="usa-form-group-wrapper" key={props.inputId}>
      <div
        className={classNames('usa-form-group', {
          'usa-form-group--error': props.error,
        })}
      >
        <label
          className={classNames('usa-label', {
            'usa-label--error': props.error,
          })}
          id={`input-message-${props.inputId}`}
        >
          {props.label}
          {props.error && (
            <span
              className="usa-error-message"
              id={`input-error-message-${props.inputId}`}
              role="alert"
            >
              {props.error.message}
            </span>
          )}
          <input
            className={classNames('usa-input', {
              'usa-input--error': props.error,
            })}
            id={`input-${props.inputId}`}
            defaultValue={props.value}
            {...register(props.inputId || Math.random().toString(), {
              //required: props.required,
            })}
            type="text"
            aria-describedby={`input-message-${props.inputId}`}
          />
        </label>
      </div>
    </div>
  );
};

export default TextInput;
