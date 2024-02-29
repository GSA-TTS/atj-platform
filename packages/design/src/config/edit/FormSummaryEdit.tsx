import React from 'react';
import { useFormContext } from 'react-hook-form';

import { type FormSummary } from '@atj/forms/src/config/elements/form-summary';

import { FormElementEditComponent } from '..';

const FormSummaryEdit: FormElementEditComponent<FormSummary> = ({
  element,
}) => {
  const { register } = useFormContext();
  return (
    <div className="grid-row grid-gap">
      <div className="grid-col grid-col-4">
        <label className="usa-label">
          Title
          <input
            className="usa-input"
            {...register(`${element.id}.data.title`)}
            type="text"
          ></input>
        </label>
      </div>
      <div className="grid-col grid-col-2">
        <label className="usa-label">
          Description
          <textarea
            className="usa-textarea"
            {...register(`${element.id}.data.description`)}
          ></textarea>
        </label>
      </div>
    </div>
  );
};

export default FormSummaryEdit;
