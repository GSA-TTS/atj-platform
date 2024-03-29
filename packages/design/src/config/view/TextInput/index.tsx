import classNames from 'classnames';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { type TextInputProps } from '@atj/forms';
import { type PatternComponent } from '../../../Form';

const TextInput: PatternComponent<TextInputProps> = ({ pattern }) => {
  const { register } = useFormContext();
  return (
    <div className="usa-form-group-wrapper" key={pattern.inputId}>
      <div
        className={classNames('usa-form-group', {
          'usa-form-group--error': pattern.error,
        })}
      >
        <label
          className={classNames('usa-label', {
            'usa-label--error': pattern.error,
          })}
          htmlFor={`input-${pattern.inputId}`}
          id={`input-message-${pattern.inputId}`}
        >
          {pattern.label}
        </label>
        {pattern.error && (
          <span
            className="usa-error-message"
            id={`input-error-message-${pattern.inputId}`}
            role="alert"
          >
            {pattern.error}
          </span>
        )}
        <input
          className={classNames('usa-input', {
            'usa-input--error': pattern.error,
          })}
          id={`input-${pattern.inputId}`}
          defaultValue={pattern.value}
          {...register(pattern.inputId, {
            //required: pattern.required,
          })}
          type="text"
          aria-describedby={`input-message-${pattern.inputId}`}
        />
      </div>
    </div>
  );
};

export default TextInput;
