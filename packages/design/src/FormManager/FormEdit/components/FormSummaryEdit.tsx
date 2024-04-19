import React from 'react';
import { useFormContext } from 'react-hook-form';

import { FormSummaryProps, PatternId } from '@atj/forms';
import { type FormSummary as FormSummaryPattern } from '@atj/forms/src/patterns/form-summary';

import FormSummary from '../../../Form/components/FormSummary';
import { PatternEditLayout } from '../PatternEditLayout';
import { PatternEditComponent } from '../types';

const FormSummaryEdit: PatternEditComponent<FormSummaryPattern> = props => {
  return (
    <PatternEditLayout
      patternId={props.previewProps._patternId}
      editComponent={
        <EditComponent patternId={props.previewProps._patternId} />
      }
      viewComponent={
        <FormSummary {...(props.previewProps as FormSummaryProps)} />
      }
    ></PatternEditLayout>
  );
};

const EditComponent = ({ patternId }: { patternId: PatternId }) => {
  const { register } = useFormContext();
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
