import classNames from 'classnames';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { type AttachmentProps } from '@atj/forms';
import { type PatternComponent } from '../../../Form/index.js';
// import { onFileInputChangeGetFile } from '../../../FormManager/FormList/CreateNew/file-input.js';

const Attachment: PatternComponent<AttachmentProps> = props => {
  const { register } = useFormContext();
  return (
    <div className="usa-form-group-wrapper" key={props.inputId}>
      <div
        className={classNames('usa-form-group margin-top-2', {
          'usa-form-group--error': props.error,
        })}
      >
        <div className="usa-form-group">
          <label
            className="usa-label"
            htmlFor={`input-${props.inputId}`}
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
          </label>
          <div className="usa-file-input">
            <div className="usa-file-input__target">
              <div className="usa-file-input__instructions" aria-hidden="true">
                Drag file here or{' '}
                <span className="usa-file-input__choose">
                  choose from folder
                </span>
              </div>
              <div className="usa-file-input__box"></div>
              <input
                className={classNames('usa-file-input__input usa-file-input', {
                  'usa-input--error': props.error,
                })}
                id={`input-${props.inputId}`}
                aria-describedby={`input-message-${props.inputId}`}
                {...register(props.inputId || Math.random().toString())}
                type="file"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attachment;
