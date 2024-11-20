import React from 'react';
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';
import { type PhoneNumberProps } from '@atj/forms';
import { type PatternComponent } from '../../index.js';

export const PhoneNumberPattern: PatternComponent<PhoneNumberProps> = ({
  phoneId,
  hint,
  label,
  required,
  error,
  value,
}) => {
  const { register } = useFormContext();
  const errorId = `input-error-message-${phoneId}`;

  return (
    <fieldset className="usa-fieldset">
      <div className={classNames('usa-form-group margin-top-2')}>
        <label
          className={classNames('usa-label', {
            'usa-label--error': error,
          })}
          id={`input-message-${phoneId}`}
          htmlFor={phoneId}
        >
          {label}
          {required && <span className="required-indicator">*</span>}
        </label>
        {hint && (
          <div className="usa-hint" id={`hint-${phoneId}`}>
            {hint}
          </div>
        )}
        {error && (
          <div className="usa-error-message" id={errorId} role="alert">
            {error.message}
          </div>
        )}
        <input
          className={classNames('usa-input', {
            'usa-input--error': error,
          })}
          id={phoneId}
          type="tel"
          defaultValue={value}
          {...register(phoneId, { required })}
          aria-describedby={error ? `${phoneId} ${errorId}` : phoneId}
        />
      </div>
    </fieldset>
  );
};
