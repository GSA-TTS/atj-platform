import React from 'react';
import { useFormContext } from 'react-hook-form';

import { type InputPattern } from '@atj/forms/src/patterns/input';
import { PatternEditComponent } from '../../FormManager/FormEdit/types';

const InputPatternEdit: PatternEditComponent<InputPattern> = ({ pattern }) => {
  const { register } = useFormContext();
  return (
    <div className="grid-row grid-gap formRowEditFields">
      <div className="grid-col grid-col-4">
        <label className="usa-label" htmlFor={`${pattern.id}.data.label`}>
          Field label
        </label>
        <input
          className="usa-input"
          id={`${pattern.id}.data.label`}
          defaultValue={`${pattern.id}`}
          {...register(`${pattern.id}.data.label`)}
          type="text"
        ></input>
      </div>
      <div className="grid-col grid-col-2">
        <label className="usa-label" htmlFor={`${pattern.id}.data.initial`}>
          Default field value
        </label>
        <input
          className="usa-input"
          id={`${pattern.id}.data.initial`}
          type="text"
          {...register(`${pattern.id}.data.initial`)}
        ></input>
      </div>
      <div className="grid-col grid-col-2">
        <label className="usa-label" htmlFor={`${pattern.id}.data.maxLength`}>
          Maximum length
        </label>
        <input
          className="usa-input"
          id={`${pattern.id}.data.maxLength`}
          type="text"
          {...register(`${pattern.id}.data.maxLength`)}
        ></input>
      </div>
      <div className="grid-col grid-col-2">
        <label className="usa-label" htmlFor={`${pattern.id}.type`}>
          Field type
        </label>
        <select
          className="usa-select"
          {...register(`${pattern.id}.type`)}
          id={`${pattern.id}.type`}
        >
          <option value={'input'}>Input</option>
        </select>
      </div>
      <div className="grid-col grid-col-2">
        <div className="usa-checkbox">
          <input
            className="usa-checkbox__input"
            type="checkbox"
            id={`${pattern.id}.data.required`}
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

export default InputPatternEdit;
