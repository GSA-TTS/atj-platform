import React from 'react';

import { type FormSummaryProps } from '@atj/forms';
import { type Pattern } from '@atj/forms/src/pattern';

import FormSummary from '../../../Form/components/FormSummary';
import { PatternEditComponent } from '../types';

import { PatternEditForm } from './common/PatternEditForm';
import { usePatternEditFormContext } from './common/hooks';
import classNames from 'classnames';

const FormSummaryEdit: PatternEditComponent<FormSummaryProps> = ({
  focus,
  previewProps,
}) => {
  return (
    <>
      {focus ? (
        <PatternEditForm
          pattern={focus.pattern}
          editComponent={<EditComponent pattern={focus.pattern} />}
        ></PatternEditForm>
      ) : (
        <FormSummary {...previewProps} />
      )}
    </>
  );
};

const EditComponent = ({ pattern }: { pattern: Pattern }) => {
  const patternId = pattern.id;
  const { getFieldState, fieldId, register } =
    usePatternEditFormContext(patternId);
  const description = getFieldState('description');
  const title = getFieldState('title');

  return (
    <div className="grid-row grid-gap-1">
      <div className="desktop:grid-col-6 mobile:grid-col-12">
        <label
          className={classNames('usa-label', {
            'usa-label--error': title.error,
          })}
          htmlFor={fieldId('title')}
        >
          Title
          {title.error ? (
            <span className="usa-error-message" role="alert">
              {title.error.message}
            </span>
          ) : null}
          <input
            id={fieldId('title')}
            className="usa-input bg-primary-lighter text-bold"
            {...register('title')}
            defaultValue={pattern.data.title}
            type="text"
          ></input>
        </label>
      </div>
      <div className="desktop:grid-col-6 mobile:grid-col-12">
        <label
          className={classNames('usa-label', {
            'usa-input--error': description.error,
          })}
          htmlFor={fieldId('description')}
        >
          Description
          {description.error ? (
            <span className="usa-error-message" role="alert">
              {description.error.message}
            </span>
          ) : null}
          <textarea
            id={fieldId('description')}
            className="usa-textarea bg-primary-lighter text-bold"
            {...register('description')}
            defaultValue={pattern.data.description}
          ></textarea>
        </label>
      </div>
    </div>
  );
};

export default FormSummaryEdit;
