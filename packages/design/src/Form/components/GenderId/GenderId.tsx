import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';
import { type GenderIdProps } from '@atj/forms';

import { type PatternComponent } from '../../index.js';

export const GenderIdPattern: PatternComponent<GenderIdProps> = ({
  genderId,
  hint,
  label,
  required,
  error,
  value,
  preferNotToAnswerText,
  preferNotToAnswerChecked: initialPreferNotToAnswerChecked = false,
}) => {
  const { register, setValue } = useFormContext();
  const [preferNotToAnswerChecked, setPreferNotToAnswerChecked] = useState(
    initialPreferNotToAnswerChecked
  );

  const errorId = `input-error-message-${genderId}`;
  const hintId = `hint-${genderId}`;
  const preferNotToAnswerId = `prefer-not-to-answer-${genderId}`;

  useEffect(() => {
    if (preferNotToAnswerChecked) {
      setValue(genderId, preferNotToAnswerText, { shouldValidate: true });
    } else {
      setValue(genderId, value, { shouldValidate: true });
    }
  }, [
    preferNotToAnswerChecked,
    setValue,
    genderId,
    preferNotToAnswerText,
    value,
  ]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreferNotToAnswerChecked(event.target.checked);
    setValue(preferNotToAnswerId, event.target.checked);
  };

  return (
    <fieldset className="usa-fieldset">
      <div className={classNames('usa-form-group margin-top-2')}>
        <label
          className={classNames('usa-label', {
            'usa-label--error': error,
          })}
          htmlFor={genderId}
        >
          {label || 'Gender identity'}
          {required && <span className="required-indicator">*</span>}
        </label>
        {hint && (
          <div className="usa-hint" id={hintId}>
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
          id={genderId}
          type="text"
          defaultValue={value}
          {...register(genderId, { required })}
          aria-describedby={
            `${hint ? `${hintId}` : ''}${error ? ` ${errorId}` : ''}`.trim() ||
            undefined
          }
          disabled={preferNotToAnswerChecked}
        />
        {preferNotToAnswerText && (
          <div className="usa-checkbox">
            <input
              className="usa-checkbox__input"
              id={preferNotToAnswerId}
              type="checkbox"
              value="prefer-not-to-answer"
              checked={preferNotToAnswerChecked}
              {...register(preferNotToAnswerId)}
              onChange={handleCheckboxChange}
            />
            <label
              className="usa-checkbox__label"
              htmlFor={preferNotToAnswerId}
            >
              {preferNotToAnswerText}
            </label>
          </div>
        )}
      </div>
    </fieldset>
  );
};
