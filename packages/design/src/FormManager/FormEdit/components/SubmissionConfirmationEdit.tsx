import React from 'react';

import { type PatternId, SubmissionConfirmationProps } from '@atj/forms';

import SubmissionConfirmation from '../../../Form/components/SubmissionConfirmation';
import { PatternEditComponent } from '../types';

import { PatternEditForm } from './common/PatternEditForm';
import { usePatternEditFormContext } from './common/hooks';

const SubmissionConfirmationEdit: PatternEditComponent<
  SubmissionConfirmationProps
> = ({ focus, previewProps }) => {
  return (
    <>
      {focus ? (
        <PatternEditForm
          pattern={focus.pattern}
          editComponent={<EditComponent patternId={focus.pattern.id} />}
        ></PatternEditForm>
      ) : (
        <SubmissionConfirmation {...previewProps} />
      )}
    </>
  );
};

const EditComponent = ({ patternId }: { patternId: PatternId }) => {
  const { fieldId, register } = usePatternEditFormContext(patternId);
  return (
    <div className="grid-row grid-gap-1 edit-component-panel">
      <div className="desktop:grid-col-4 mobile:grid-col-12">
        <label className="usa-label">
          Field label
          <input
            className="usa-input bg-primary-lighter text-bold"
            {...register('data.text')}
            type="text"
          ></input>
        </label>
      </div>
      <div className="desktop:grid-col-2 mobile:grid-col-12">
        <label className="usa-label">
          Default field value
          <input
            className="usa-input bg-primary-lighter text-bold"
            type="text"
            {...register('data.initial')}
          ></input>
        </label>
      </div>
      <div className="desktop:grid-col-2 mobile:grid-col-12">
        <label className="usa-label">
          Maximum length
          <input
            className="usa-input bg-primary-lighter text-bold"
            type="text"
            {...register('data.maxLength')}
          ></input>
        </label>
      </div>
      <div className="desktop:grid-col-2 mobile:grid-col-12">
        <label className="usa-label">
          Field type
          <select
            className="usa-select bg-primary-lighter text-bold"
            {...register('type')}
          >
            <option value={'input'}>Input</option>
          </select>
        </label>
      </div>
      <div className="desktop:grid-col-2 mobile:grid-col-12">
        <div className="usa-checkbox">
          <input
            className="usa-checkbox__input bg-primary-lighter"
            type="checkbox"
            id={fieldId('data.required')}
            {...register('data.required')}
          />
          <label
            className="usa-checkbox__label"
            htmlFor={fieldId('data.required')}
          >
            Required
          </label>
        </div>
      </div>
    </div>
  );
};

export default SubmissionConfirmationEdit;
