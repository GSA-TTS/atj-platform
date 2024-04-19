import React from 'react';

import { type FormSummaryProps, type PatternId } from '@atj/forms';

import FormSummary from '../../../Form/components/FormSummary';
import { PatternEditForm, usePatternEditFormContext } from '../PatternEditForm';
import { useIsPatternSelected } from '../store';
import { PatternEditComponent } from '../types';

const FormSummaryEdit: PatternEditComponent<FormSummaryProps> = props => {
  const isSelected = useIsPatternSelected(props.previewProps._patternId);
  return (
    <>
      {isSelected ? (
        <PatternEditForm
          patternId={props.previewProps._patternId}
          editComponent={
            <EditComponent patternId={props.previewProps._patternId} />
          }
        ></PatternEditForm>
      ) : (
        <FormSummary {...props.previewProps} />
      )}
    </>
  );
};

const EditComponent = ({ patternId }: { patternId: PatternId }) => {
  const { register } = usePatternEditFormContext();
  return (
    <div className="grid-row grid-gap">
      <div className="grid-col grid-col-4">
        <label className="usa-label">
          Title
          <input
            className="usa-input"
            {...register(`${patternId}.data.title`)}
            type="text"
          ></input>
        </label>
      </div>
      <div className="grid-col grid-col-2">
        <label className="usa-label">
          Description
          <textarea
            className="usa-textarea"
            {...register(`${patternId}.data.description`)}
          ></textarea>
        </label>
      </div>
    </div>
  );
};

export default FormSummaryEdit;
