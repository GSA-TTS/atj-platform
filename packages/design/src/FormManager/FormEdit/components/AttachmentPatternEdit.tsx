import classNames from 'classnames';
import React from 'react';

import { PatternId, AttachmentProps } from '@atj/forms';
import { AttachmentPattern } from '@atj/forms';

import Attachment from '../../../Form/components/Attachment/index.js';
import { useFormManagerStore } from '../../store.js';
import { PatternEditComponent } from '../types.js';

import { PatternEditActions } from './common/PatternEditActions.js';
import { PatternEditForm } from './common/PatternEditForm.js';
import { usePatternEditFormContext } from './common/hooks.js';
import { enLocale as message } from '@atj/common';

const AttachmentPatternEdit: PatternEditComponent<AttachmentProps> = ({
  focus,
  previewProps,
}) => {
  return (
    <>
      {focus ? (
        <PatternEditForm
          pattern={focus.pattern}
          editComponent={<EditComponent patternId={focus.pattern.id} />}
        ></PatternEditForm>
      ) : (
        <div className="padding-left-3 padding-bottom-3 padding-right-3">
          <Attachment {...previewProps} />
        </div>
      )}
    </>
  );
};

const EditComponent = ({ patternId }: { patternId: PatternId }) => {
  const pattern = useFormManagerStore<AttachmentPattern>(
    state => state.session.form.patterns[patternId]
  );
  const { fieldId, register, getFieldState } =
    usePatternEditFormContext<AttachmentPattern>(patternId);

  console.group('EditComponent');
  console.log(pattern);
  console.groupEnd();

  const label = getFieldState('label');
  const maxAttachments = getFieldState('maxAttachments');
  const allowedFileTypes = getFieldState('allowedFileTypes');

  return (
    <div className="grid-row grid-gap-1">
      <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
        <label
          className={classNames('usa-label', {
            'usa-label--error': label.error,
          })}
          htmlFor={fieldId('label')}
        >
          {message.patterns.attachment.fieldLabel}
          {label.error ? (
            <span className="usa-error-message" role="alert">
              {label.error.message}
            </span>
          ) : null}
          <input
            className={classNames('usa-input bg-primary-lighter text-bold', {
              'usa-input--error': label.error,
            })}
            id={fieldId('label')}
            defaultValue={pattern.data.label}
            {...register('label')}
            type="text"
            autoFocus
          ></input>
        </label>
      </div>
      <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
        <label
          className={classNames('usa-label', {
            'usa-label--error': maxAttachments.error,
          })}
          htmlFor={fieldId('maxAttachments')}
        >
          {maxAttachments.error ? (
            <span className="usa-error-message" role="alert">
              {maxAttachments.error.message}
            </span>
          ) : null}
          {message.patterns.attachment.maxAttachmentsLabel}
          <input
            className="usa-input bg-primary-lighter text-bold"
            id={fieldId('maxAttachments')}
            type="number"
            defaultValue={pattern.data.maxAttachments}
            {...register('maxAttachments')}
            min="1"
          ></input>
        </label>
      </div>
      <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
        <p
          className={classNames('usa-label padding-bottom-2', {
            'usa-label--error': allowedFileTypes.error,
          })}
        >
          {message.patterns.attachment.allowedFileTypesLabel}
        </p>
        {allowedFileTypes.error ? (
          <span className="usa-error-message" role="alert">
            {allowedFileTypes.error.message}
          </span>
        ) : null}
        <div className="usa-checkbox">
          <input
            className="usa-checkbox__input"
            id={`${fieldId('allowedFileTypes')}-jpg`}
            type="checkbox"
            {...register('allowedFileTypes')}
            value="jpg"
          ></input>
          <label
            className="usa-checkbox__label"
            htmlFor={`${fieldId('allowedFileTypes')}-jpg`}
          >
            JPEG
          </label>
        </div>
        <div className="usa-checkbox">
          <input
            className="usa-checkbox__input"
            id={`${fieldId('allowedFileTypes')}-pdf`}
            type="checkbox"
            {...register('allowedFileTypes')}
            value="pdf"
          ></input>
          <label
            className="usa-checkbox__label"
            htmlFor={`${fieldId('allowedFileTypes')}-pdf`}
          >
            PDF
          </label>
        </div>
        <div className="usa-checkbox">
          <input
            className="usa-checkbox__input"
            id={`${fieldId('allowedFileTypes')}-png`}
            type="checkbox"
            {...register('allowedFileTypes')}
            value="png"
          ></input>
          <label
            className="usa-checkbox__label"
            htmlFor={`${fieldId('allowedFileTypes')}-png`}
          >
            PNG
          </label>
        </div>
      </div>
      <div className="grid-col-12">
        <PatternEditActions>
          <span className="usa-checkbox">
            <input
              style={{ display: 'inline-block' }}
              className="usa-checkbox__input bg-primary-lighter"
              type="checkbox"
              id={fieldId('required')}
              {...register('required')}
              defaultChecked={pattern.data.required}
            />
            <label
              style={{ display: 'inline-block' }}
              className="usa-checkbox__label"
              htmlFor={fieldId('required')}
            >
              Required
            </label>
          </span>
        </PatternEditActions>
      </div>
    </div>
  );
};

export default AttachmentPatternEdit;
