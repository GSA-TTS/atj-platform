import classNames from 'classnames';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Pattern, type TextInputPattern } from '@atj/forms';
import { type FormElementComponent } from '../../../Form';

export type TextInputProps = { prompt: Pattern<TextInputPattern> };

const TextInput: FormElementComponent<Pattern<TextInputPattern>> = ({
  prompt,
}) => {
  const { register } = useFormContext();
  return (
    <div className="usa-form-group" key={prompt.inputId}>
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
            id={`input-error-message-${prompt.inputId}`}
            role="alert"
          >
            {prompt.error}
          </span>
        )}
        <input
          className={classNames('usa-input', {
            'usa-input--error': prompt.error,
          })}
          id={`input-${prompt.inputId}`}
          defaultValue={prompt.value}
          {...register(prompt.inputId, {
            //required: prompt.required,
          })}
          type="text"
          aria-describedby={`input-message-${prompt.inputId}`}
        />
      </div>
    </div>
  );
};

export default TextInput;
