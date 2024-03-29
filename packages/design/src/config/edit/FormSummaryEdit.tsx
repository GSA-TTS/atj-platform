import React from 'react';
import { useFormContext } from 'react-hook-form';

import { type FormSummary } from '@atj/forms/src/patterns/form-summary';
import { PatternEditComponent } from '../../FormManager/FormEdit/types';

const FormSummaryEdit: PatternEditComponent<FormSummary> = ({ pattern }) => {
  const { register } = useFormContext();
  return (
    <div className="grid-row grid-gap">
      <div className="grid-col grid-col-4">
        <label className="usa-label">
          Title
          <input
            className="usa-input"
            {...register(`${pattern.id}.data.title`)}
            type="text"
          ></input>
        </label>
      </div>
      <div className="grid-col grid-col-2">
        <label className="usa-label">
          Description
          <textarea
            className="usa-textarea"
            {...register(`${pattern.id}.data.description`)}
          ></textarea>
        </label>
      </div>
    </div>
  );
};

export default FormSummaryEdit;
