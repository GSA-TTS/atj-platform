import React from 'react';

import { type FormSummaryProps } from '@atj/forms';
import { type Pattern } from '@atj/forms/src/pattern';

import FormSummary from '../../../Form/components/FormSummary';
import { PatternEditComponent } from '../types';

import { PatternEditForm } from './common/PatternEditForm';
import { usePatternEditFormContext } from './common/hooks';
import { PatternEditActions } from './common/PatternEditActions';

const FormSummaryEdit: PatternEditComponent<FormSummaryProps> = ({
  focus,
  previewProps,
}) => {
  return (
    <>
      {focus ? (
        <PatternEditForm
          pattern={focus.pattern}
          editComponent={<EditComponent pattern={focus.pattern} />}
        ></PatternEditForm>
      ) : (
        <FormSummary {...previewProps} />
      )}
    </>
  );
};

const EditComponent = ({ pattern }: { pattern: Pattern }) => {
  const patternId = pattern.id;
  const { register } = usePatternEditFormContext(patternId);

  return (
    <>
      <div className="grid-row grid-gap-1">
        <div className="desktop:grid-col-6 mobile:grid-col-12">
          <label className="usa-label">
            Title
            <input
              className="usa-input bg-primary-lighter text-bold"
              {...register('title')}
              defaultValue={pattern.data.title}
              type="text"
            ></input>
          </label>
        </div>
        <div className="desktop:grid-col-6 mobile:grid-col-12">
          <label className="usa-label">
            Description
            <textarea
              className="usa-textarea bg-primary-lighter text-bold"
              {...register('description')}
              defaultValue={pattern.data.description}
            ></textarea>
          </label>
        </div>
      </div>
      <div className="grid-col-12">
        <PatternEditActions />
      </div>
    </>
  );
};

export default FormSummaryEdit;
