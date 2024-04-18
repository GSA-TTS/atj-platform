import React from 'react';
import { useFormContext } from 'react-hook-form';

import { FormSummaryProps } from '@atj/forms';

import { PatternComponent } from '../../../Form';
import FormSummary from '../../../Form/components/FormSummary';

import { PatternEditForm } from '../PatternEditForm';
import { useFormEditStore } from '../store';

const FormSummaryEdit: PatternComponent<FormSummaryProps> = props => {
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
                Title
                <input
                  className="usa-input"
                  {...register(`${props._patternId}.data.title`)}
                  type="text"
                ></input>
              </label>
            </div>
            <div className="grid-col grid-col-2">
              <label className="usa-label">
                Description
                <textarea
                  className="usa-textarea"
                  {...register(`${props._patternId}.data.description`)}
                ></textarea>
              </label>
            </div>
          </div>
        </PatternEditForm>
      ) : (
        <FormSummary {...props} />
      )}
    </>
  );
};

export default FormSummaryEdit;
