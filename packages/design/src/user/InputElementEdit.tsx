import React from 'react';
import { useFormContext } from 'react-hook-form';

import { InputElement } from '@atj/forms/src/config/elements/input';

export default function InputElementEdit({
  element,
}: {
  element: InputElement;
}) {
  const { register } = useFormContext();
  return (
    <div className="grid-row grid-gap">
      <div className="grid-col">
        <label className="usa-label">
          Input type
          <select className="usa-select" {...register(`${element.id}.type`)}>
            <option value={'input'}>Input</option>
            <option value={'textarea'}>Textarea</option>
          </select>
        </label>
      </div>
      <div className="grid-col">
        <label className="usa-label">
          Field label
          <input
            className="usa-input"
            {...register(`${element.id}.data.text`)}
            type="text"
          ></input>
        </label>
      </div>
      <div className="grid-col">
        <label className="usa-label">
          Default value
          <input
            className="usa-input"
            type="text"
            {...register(`${element.id}.data.initial`)}
          ></input>
        </label>
      </div>
      <div className="grid-col">
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
}
