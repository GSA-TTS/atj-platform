import React from 'react';
import { useFormContext } from 'react-hook-form';

import { type ParagraphElement } from '@atj/forms/src/patterns/paragraph';

import { type PatternEditComponent } from '../../FormManager/FormEdit/types';

const ParagraphElementEdit: PatternEditComponent<ParagraphElement> = ({
  element,
}) => {
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
            <option value={'paragraph'}>Question</option> {/* this is a stub */}
            <option value={'paragraph'}>Title</option> {/* this is a stub */}
            <option value={'paragraph'}>Instructions</option>{' '}
            {/* this is a stub */}
          </select>
        </label>
      </div>
    </div>
  );
};

export default ParagraphElementEdit;
