import React from 'react';

import { type PatternId, SubmissionConfirmationProps } from '@atj/forms';

import SubmissionConfirmation from '../../../Form/components/SubmissionConfirmation';
import { useFormManagerStore } from '../../store';
import { PatternEditComponent } from '../types';

import {
  PatternEditForm,
  usePatternEditFormContext,
} from './common/PatternEditForm';

const SubmissionConfirmationEdit: PatternEditComponent<
  SubmissionConfirmationProps
> = props => {
  const isSelected = useFormManagerStore(
    state => state.focusedPattern?.id === props.previewProps._patternId
  );
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
    <div className="grid-row grid-gap">
      <div className="grid-col grid-col-4">
        <label className="usa-label">
          Field label
          <input
            className="usa-input"
            {...register(`${patternId}.data.text`)}
            type="text"
          ></input>
        </label>
      </div>
      <div className="grid-col grid-col-2">
        <label className="usa-label">
          Default field value
          <input
            className="usa-input"
            type="text"
            {...register(`${patternId}.data.initial`)}
          ></input>
        </label>
      </div>
      <div className="grid-col grid-col-2">
        <label className="usa-label">
          Maximum length
          <input
            className="usa-input"
            type="text"
            {...register(`${patternId}.data.maxLength`)}
          ></input>
        </label>
      </div>
      <div className="grid-col grid-col-2">
        <label className="usa-label">
          Field type
          <select className="usa-select" {...register(`${patternId}.type`)}>
            <option value={'input'}>Input</option>
          </select>
        </label>
      </div>
      <div className="grid-col grid-col-2">
        <div className="usa-checkbox">
          <input
            className="usa-checkbox__input"
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
