import React from 'react';
import { useFormContext } from 'react-hook-form';

import { type SubmissionConfirmationProps } from '@atj/forms';

import { PatternComponent } from '../../../Form';
import SubmissionConfirmation from '../../../Form/components/SubmissionConfirmation';

import { PatternEditForm } from '../PatternEditForm';
import { useFormEditStore } from '../store';

const SubmissionConfirmationEdit: PatternComponent<
  SubmissionConfirmationProps
> = props => {
  const { register } = useFormContext();
  const focusedPattern = useFormEditStore(state => state.focusedPattern);
  const showEditUI = focusedPattern?.id === props._patternId;
  return (
    <>
      {showEditUI ? (
        <PatternEditForm>
          <div className="grid-row grid-gap">
            <div className="grid-col grid-col-4">
              <label className="usa-label">
                Field label
                <input
                  className="usa-input"
                  {...register(`${props._patternId}.data.text`)}
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
                  {...register(`${props._patternId}.data.initial`)}
                ></input>
              </label>
            </div>
            <div className="grid-col grid-col-2">
              <label className="usa-label">
                Maximum length
                <input
                  className="usa-input"
                  type="text"
                  {...register(`${props._patternId}.data.maxLength`)}
                ></input>
              </label>
            </div>
            <div className="grid-col grid-col-2">
              <label className="usa-label">
                Field type
                <select
                  className="usa-select"
                  {...register(`${props._patternId}.type`)}
                >
                  <option value={'input'}>Input</option>
                </select>
              </label>
            </div>
            <div className="grid-col grid-col-2">
              <div className="usa-checkbox">
                <input
                  className="usa-checkbox__input"
                  type="checkbox"
                  id={`${props._patternId}.required`}
                  {...register(`${props._patternId}.data.required`)}
                />
                <label
                  className="usa-checkbox__label"
                  htmlFor={`${props._patternId}.data.required`}
                >
                  Required
                </label>
              </div>
            </div>
          </div>
        </PatternEditForm>
      ) : (
        <SubmissionConfirmation {...props} />
      )}
    </>
  );
};

export default SubmissionConfirmationEdit;
