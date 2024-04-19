import React from 'react';
import { useFormContext } from 'react-hook-form';

import { type SubmissionConfirmationProps, type PatternId } from '@atj/forms';
import { type InputPattern } from '@atj/forms/src/patterns/input';

import SubmissionConfirmation from '../../../Form/components/SubmissionConfirmation';
import { PatternEditLayout } from '../PatternEditLayout';
import { PatternEditComponent } from '../types';

const SubmissionConfirmationEdit: PatternEditComponent<
  InputPattern
> = props => {
  return (
    <PatternEditLayout
      patternId={props.previewProps._patternId}
      editComponent={
        <EditComponent patternId={props.previewProps._patternId} />
      }
      viewComponent={
        <SubmissionConfirmation
          {...(props.previewProps as SubmissionConfirmationProps)}
        />
      }
    ></PatternEditLayout>
  );
};

const EditComponent = ({ patternId }: { patternId: PatternId }) => {
  const { register } = useFormContext();
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
