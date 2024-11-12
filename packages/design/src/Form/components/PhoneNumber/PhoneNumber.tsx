import React from 'react';
import { useFormContext } from 'react-hook-form';
import { type PhoneNumberProps } from '@atj/forms';
import { type PatternComponent } from '../../index.js';

export const PhoneNumberPattern: PatternComponent<PhoneNumberProps> = ({
  phoneId,
  hint,
  label,
  required,
  error,
}) => {
  const { register } = useFormContext();

  return (
    <fieldset className="usa-fieldset">
      <div className="usa-form-group">
        <label className="usa-label" htmlFor={phoneId}>
          {label}
          {required && <span className="required-indicator">*</span>}
        </label>
        {hint && (
          <div className="usa-hint" id="primaryPnHint">
            {hint}
          </div>
        )}
        <input
          className="usa-input margin-bottom-1"
          id={phoneId}
          type="tel"
          {...register(phoneId, { required })}
          aria-describedby="primaryPnHint"
          // pattern="[0-9]*"
          // inputMode="numeric"
        />
        {error && (
          <div className="error-message" style={{ color: 'red' }}>
            {error.message}
          </div>
        )}
      </div>
    </fieldset>
  );
};
