import classNames from 'classnames';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Pattern, type TextInputPattern } from '@atj/forms';
import { type FormElementComponent } from '../../../Form';

const TextInput: FormElementComponent<Pattern<TextInputPattern>> = ({
  pattern,
}) => {
  const { register } = useFormContext();
  return (
    <div className="usa-form-group" key={pattern.inputId}>
      <div
        className={classNames('usa-form-group', {
          'usa-form-group--error': pattern.error,
        })}
      >
        <label
          className={classNames('usa-label', {
            'usa-label--error': pattern.error,
          })}
          htmlFor="input-error"
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
