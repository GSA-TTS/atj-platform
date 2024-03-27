import React from 'react';
import { useFormContext } from 'react-hook-form';

import { type InputPattern } from '@atj/forms/src/patterns/input';
import { type PatternEditComponent } from '../../FormManager/FormEdit/types';

const SubmissionConfirmationEdit: PatternEditComponent<InputPattern> = ({
  pattern,
}) => {
  const { register } = useFormContext();
  return (
    <div className="grid-row grid-gap">
      <div className="grid-col grid-col-4">
        <label className="usa-label">
          Field label
          <input
            className="usa-input"
            {...register(`${pattern.id}.data.text`)}
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
            {...register(`${pattern.id}.data.initial`)}
          ></input>
        </label>
      </div>
      <div className="grid-col grid-col-2">
        <label className="usa-label">
          Maximum length
          <input
            className="usa-input"
            type="text"
            {...register(`${pattern.id}.data.maxLength`)}
          ></input>
        </label>
      </div>
      <div className="grid-col grid-col-2">
        <label className="usa-label">
          Field type
          <select className="usa-select" {...register(`${pattern.id}.type`)}>
            <option value={'input'}>Input</option>
          </select>
        </label>
      </div>
      <div className="grid-col grid-col-2">
        <div className="usa-checkbox">
          <input
            className="usa-checkbox__input"
            type="checkbox"
            id={`${pattern.id}.required`}
            {...register(`${pattern.id}.data.required`)}
          />
          <label
            className="usa-checkbox__label"
            htmlFor={`${pattern.id}.data.required`}
          >
            Required
          </label>
        </div>
      </div>
    </div>
  );
};

export default SubmissionConfirmationEdit;
