import React from 'react';
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';
import { type SocialSecurityNumberProps } from '@atj/forms';

import { type PatternComponent } from '../../index.js';

export const SocialSecurityNumberPattern: PatternComponent<
  SocialSecurityNumberProps
> = ({ ssnId, hint, label, required, error, value }) => {
  const { register } = useFormContext();
  const errorId = `input-error-message-${ssnId}`;

  return (
    <fieldset className="usa-fieldset">
      <div className={classNames('usa-form-group margin-top-2')}>
        <label
          className={classNames('usa-label', {
            'usa-label--error': error,
          })}
          htmlFor={ssnId}
        >
          {label || 'Social Security Number'}
          {required && <span className="required-indicator">*</span>}
        </label>
        {hint && (
          <div className="usa-hint" id={`hint-${ssnId}`}>
            {hint}
          </div>
        )}
        {error && (
          <div className="usa-error-message" id={errorId} role="alert">
            {error.message}
          </div>
        )}
        <input
          className={classNames('usa-input usa-input--xl', {
            'usa-input--error': error,
          })}
          id={ssnId}
          type="text"
          defaultValue={value}
          {...register(ssnId, { required })}
          aria-describedby={error ? `${ssnId} ${errorId}` : ssnId}
        />
      </div>
    </fieldset>
  );
};
