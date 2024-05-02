import React from 'react';

import { type PatternId, SubmissionConfirmationProps } from '@atj/forms';

import SubmissionConfirmation from '../../../Form/components/SubmissionConfirmation';
import { useIsPatternSelected } from '../store';
import { PatternEditComponent } from '../types';

import {
  PatternEditForm,
  usePatternEditFormContext,
} from './common/PatternEditForm';

const SubmissionConfirmationEdit: PatternEditComponent<
  SubmissionConfirmationProps
> = props => {
  const isSelected = useIsPatternSelected(props.previewProps._patternId);
  return (
    <>
      {isSelected ? (
        <PatternEditForm
          patternId={props.previewProps._patternId}
          editComponent={
            <EditComponent patternId={props.previewProps._patternId} />
          }
        ></PatternEditForm>
      ) : (
        <SubmissionConfirmation {...props.previewProps} />
      )}
    </>
  );
};

const EditComponent = ({ patternId }: { patternId: PatternId }) => {
  const { register } = usePatternEditFormContext();
  return (
    <div className="grid-row grid-gap-1 edit-component-panel">
      <div className="desktop:grid-col-4 mobile:grid-col-12">
        <label className="usa-label">
          Field label
          <input
            className="usa-input bg-primary-lighter text-bold"
            {...register(`${patternId}.data.text`)}
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
            {...register(`${patternId}.data.initial`)}
          ></input>
        </label>
      </div>
      <div className="desktop:grid-col-2 mobile:grid-col-12">
        <label className="usa-label">
          Maximum length
          <input
            className="usa-input bg-primary-lighter text-bold"
            type="text"
            {...register(`${patternId}.data.maxLength`)}
          ></input>
        </label>
      </div>
      <div className="desktop:grid-col-2 mobile:grid-col-12">
        <label className="usa-label">
          Field type
          <select className="usa-select bg-primary-lighter text-bold" {...register(`${patternId}.type`)}>
            <option value={'input'}>Input</option>
          </select>
        </label>
      </div>
      <div className="desktop:grid-col-2 mobile:grid-col-12">
        <div className="usa-checkbox">
          <input
            className="usa-checkbox__input bg-primary-lighter"
            type="checkbox"
            id={`${patternId}.required`}
            {...register(`${patternId}.data.required`)}
          />
          <label
            className="usa-checkbox__label"
            htmlFor={`${patternId}.data.required`}
          >
            Required
          </label>
        </div>
      </div>
    </div>
  );
};

export default SubmissionConfirmationEdit;
