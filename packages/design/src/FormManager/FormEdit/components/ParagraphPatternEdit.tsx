import React from 'react';
import { useFormContext } from 'react-hook-form';

import { type ParagraphProps } from '@atj/forms';

import { PatternComponent } from '../../../Form';
import Paragraph from '../../../Form/components/Paragraph';
import { PatternEditActions } from '../PatternEditActions';
import { PatternEditForm } from '../PatternEditForm';

import { useFormEditStore } from '../store';

const ParagraphPatternEdit: PatternComponent<ParagraphProps> = props => {
  const { register } = useFormContext();
  const focusedPattern = useFormEditStore(state => state.focusedPattern);
  const showEditUI = focusedPattern?.id === props._patternId;
  return (
    <>
      {showEditUI ? (
        <>
          <PatternEditForm>
            <div className="grid-row grid-gap">
              <div className="grid-col grid-col-10 flex-align-self-end">
                <label className="usa-label">
                  Text Element
                  <input
                    className="usa-input"
                    {...register(`${props._patternId}.data.text`)}
                    type="text"
                  ></input>
                </label>
              </div>
              <div className="grid-col grid-col-2 flex-align-self-end">
                <label className="usa-label">
                  <p className="usa-hint font-ui-3xs">Style</p>
                  <select
                    className="usa-select"
                    {...register(`${props._patternId}.type`)}
                  >
                    <option value={'paragraph'}>Question</option>{' '}
                    {/* this is a stub */}
                    <option value={'paragraph'}>Title</option>{' '}
                    {/* this is a stub */}
                    <option value={'paragraph'}>Instructions</option>{' '}
                    {/* this is a stub */}
                  </select>
                </label>
              </div>
            </div>
          </PatternEditForm>
          <PatternEditActions />
        </>
      ) : (
        <Paragraph {...props} />
      )}
    </>
  );
};

export default ParagraphPatternEdit;
