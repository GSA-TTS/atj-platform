import React from 'react';
import { useFormContext } from 'react-hook-form';

import { type ParagraphElement } from '@atj/forms/src/config/elements/paragraph';

import { type FormElementComponent } from '.';

const ParagraphElementEdit: FormElementComponent<ParagraphElement> = ({ element }) => {
  const { register } = useFormContext();
  return (
    <div className="grid-row grid-gap">
      <div className="grid-col grid-col-10 flex-align-self-end">
        <label className="usa-label">
          Text Element
          <input
            className="usa-input"
            {...register(`${element.id}.data.text`)}
            type="text"
          ></input>
        </label>
      </div>
      <div className="grid-col grid-col-2 flex-align-self-end">
        <label className="usa-label">
          <p className="usa-hint font-ui-3xs">Style</p>
          <select className="usa-select" {...register(`${element.id}.type`)}>
            <option value={'paragraph'}>Question</option>
            <option value={'paragraph'}>Title</option>
            <option value={'paragraph'}>Instructions</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default ParagraphElementEdit;