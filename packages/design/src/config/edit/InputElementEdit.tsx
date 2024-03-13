import React from 'react';
import { useFormContext } from 'react-hook-form';

import { type InputElement } from '@atj/forms/src/config/elements/input';

import { FormElementEditComponent } from '..';

const InputElementEdit: FormElementEditComponent<InputElement> = ({
  element,
}) => {
  const { register } = useFormContext();
  return (
    <div className="grid-row grid-gap formRowEditFields">
      <div className="grid-col grid-col-4">
        <label className="usa-label" htmlFor={`${element.id}.data.label`}>
          Field label
        </label>
        <input
          className="usa-input"
          id={`${element.id}.data.label`}
          defaultValue={`${element.id}`}
          {...register(`${element.id}.data.label`)}
          type="text"
        ></input>
      </div>
      <div className="grid-col grid-col-2">
        <label className="usa-label" htmlFor={`${element.id}.data.initial`}>
          Default field value
        </label>
        <input
          className="usa-input"
          id={`${element.id}.data.initial`}
          type="text"
          {...register(`${element.id}.data.initial`)}
        ></input>
      </div>
      <div className="grid-col grid-col-2">
        <label className="usa-label" htmlFor={`${element.id}.data.maxLength`}>
          Maximum length
        </label>
        <input
          className="usa-input"
          id={`${element.id}.data.maxLength`}
          type="text"
          {...register(`${element.id}.data.maxLength`)}
        ></input>
      </div>
      <div className="grid-col grid-col-2">
        <label className="usa-label" htmlFor={`${element.id}.type`}>
          Field type
        </label>
        <select
          className="usa-select"
          {...register(`${element.id}.type`)}
          id={`${element.id}.type`}
        >
          <option value={'input'}>Input</option>
        </select>
      </div>
      <div className="grid-col grid-col-2">
        <div className="usa-checkbox">
          <input
            className="usa-checkbox__input"
            type="checkbox"
            id={`${element.id}.data.required`}
            {...register(`${element.id}.data.required`)}
          />
          <label
            className="usa-checkbox__label"
            htmlFor={`${element.id}.data.required`}
          >
            Required
          </label>
        </div>
      </div>
    </div>
  );
};

export default InputElementEdit;
