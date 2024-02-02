import React from 'react';
import { useFormContext } from 'react-hook-form';

import { type TextInputPrompt } from '@atj/forms';

export type TextInputProps = { prompt: TextInputPrompt };

export default function TextInput({ prompt }: TextInputProps) {
  const { register } = useFormContext();
  return (
    <div className="usa-form-group" key={prompt.id}>
      <label className="usa-label" htmlFor={prompt.id}>
        {prompt.label}
        {prompt.required && (
          <>
            {' '}
            <abbr title="required" className="usa-hint usa-hint--required">
              *
            </abbr>
          </>
        )}
      </label>
      <input
        className="usa-input"
        defaultValue={prompt.value}
        {...register(prompt.id, {
          required: prompt.required,
        })}
      />
    </div>
  );
}
