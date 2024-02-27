import React from 'react';
import { useFormContext } from 'react-hook-form';

import { type InputElement } from '@atj/forms/src/config/elements/input';

import { FormElementEditComponent } from '..';

const InputElementEdit: FormElementEditComponent<InputElement> = ({
  element,
}) => {
  const { register } = useFormContext();
  return (
    <div>
      <div className="grid-row grid-gap padding-left-5">
        <div className="grid-col grid-col-4 flex-fill flex-align-self-end">
          <label className="usa-label">
            Input
            <p className="usa-hint font-ui-3xs">Instructions:</p>
            <input
              className="usa-input"
              {...register(`${element.id}.data.instructions`)}
              type="text"
              placeholder={`Short answer: ${element.data.maxLength} chars`}
            ></input>
          </label>
        </div>
        {/* <div className="grid-col grid-col-2 flex-align-self-end">
          <label className="usa-label">
            <p className="usa-hint font-ui-3xs">Max length</p>
            <input
              className="usa-input"
              type="text"
              {...register(`${element.id}.data.maxLength`)}
            ></input>
          </label>
        </div> */}
        <div className="grid-col grid-col-4 flex-align-self-end">
          <label className="usa-label">
            <p className="usa-hint font-ui-3xs">Input type</p>
            <select className="usa-select" {...register(`${element.id}.type`)}>
              <option
                value={'input'}
              >{`${element.default} (${element.data.maxLength} chars)`}</option>
              <option value={'input'}>Long Answer (500 chars)</option>{' '}
              {/* this is a stub */}
            </select>
          </label>
        </div>
      </div>
      <div className="grid-row grid-gap padding-left-5 flex-justify-end">
        <div>
          <label className="usa-label">
            <p className="usa-hint font-ui-3xs">
              PDF Field ID: {`${element.data.text}`}
            </p>
          </label>
        </div>
        <div className="usa-checkbox">
          <input
            className="usa-checkbox__input"
            type="checkbox"
            id={`${element.id}.required`}
            {...register(`${element.id}.data.required`)}
            checked={element.required}
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
