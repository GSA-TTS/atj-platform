import React from 'react';

import { type FormSummaryProps, type PatternId } from '@atj/forms';

import FormSummary from '../../../Form/components/FormSummary';
import { PatternEditComponent } from '../types';

import { PatternEditForm } from './common/PatternEditForm';
import { usePatternEditFormContext } from './common/hooks';

const FormSummaryEdit: PatternEditComponent<FormSummaryProps> = ({
  focus,
  previewProps,
}) => {
  return (
    <>
      {focus ? (
        <PatternEditForm
          pattern={focus.pattern}
          editComponent={<EditComponent patternId={focus.pattern.id} />}
        ></PatternEditForm>
      ) : (
        <FormSummary {...previewProps} />
      )}
    </>
  );
};

const EditComponent = ({ patternId }: { patternId: PatternId }) => {
  const { register } = usePatternEditFormContext(patternId);
  return (
    <div className="grid-row grid-gap-1 edit-component-panel">
      <div className="desktop:grid-col-4 mobile:grid-col-12">
        <label className="usa-label">
          Title
          <input
            className="usa-input bg-primary-lighter text-bold"
            {...register('data.title')}
            type="text"
          ></input>
        </label>
      </div>
      <div className="desktop:grid-col-2 mobile:grid-col-12">
        <label className="usa-label">
          Description
          <textarea
            className="usa-textarea bg-primary-lighter text-bold"
            {...register('data.description')}
          ></textarea>
        </label>
      </div>
    </div>
  );
};

export default FormSummaryEdit;
