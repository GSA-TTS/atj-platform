import React from 'react';
import { useFormContext } from 'react-hook-form';

import { type ParagraphPattern } from '@atj/forms/src/patterns/paragraph';

import { PatternEditActions } from '../PatternEditActions';
import { PatternEditComponent } from '../types';

const ParagraphPatternEdit: PatternEditComponent<ParagraphPattern> = ({
  pattern,
}) => {
  const { register } = useFormContext();
  return (
    <div className="grid-row grid-gap">
      <div className="grid-col grid-col-10 flex-align-self-end">
        <label className="usa-label">
          Text Element
          <input
            className="usa-input"
            {...register(`${pattern.id}.data.text`)}
            type="text"
          ></input>
        </label>
      </div>
      <div className="grid-col grid-col-2 flex-align-self-end">
        <label className="usa-label">
          <p className="usa-hint font-ui-3xs">Style</p>
          <select className="usa-select" {...register(`${pattern.id}.type`)}>
            <option value={'paragraph'}>Question</option> {/* this is a stub */}
            <option value={'paragraph'}>Title</option> {/* this is a stub */}
            <option value={'paragraph'}>Instructions</option>{' '}
            {/* this is a stub */}
          </select>
        </label>
      </div>
      <PatternEditActions />
    </div>
  );
};

export default ParagraphPatternEdit;
