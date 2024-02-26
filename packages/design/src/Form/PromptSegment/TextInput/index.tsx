import classNames from 'classnames';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { type TextInputPrompt } from '@atj/forms';

export type TextInputProps = { prompt: TextInputPrompt };

export default function TextInput({ prompt }: TextInputProps) {
  const { register } = useFormContext();
  return (
    <div className="usa-form-group" key={prompt.id}>
      <div
        className={classNames('usa-form-group', {
          'usa-form-group--error': prompt.error,
        })}
      >
        <label
          className={classNames('usa-label', {
            'usa-label--error': prompt.error,
          })}
          htmlFor="input-error"
        >
          {prompt.instructions}
        </label>
        {prompt.error && (
          <span
            className="usa-error-message"
            id={`input-error-message-${prompt.id}`}
            role="alert"
          >
            {prompt.error}
          </span>
        )}
        <input
          className={classNames('usa-input', {
            'usa-input--error': prompt.error,
          })}
          id={`input-${prompt.id}`}
          defaultValue={prompt.value}
          {...register(prompt.id, {
            //required: prompt.required,
          })}
          type="text"
          aria-describedby={`input-message-${prompt.id}`}
        />
      </div>
    </div>
  );
}
