import React from 'react';

import { type FormSummaryProps, type PatternId } from '@atj/forms';

import FormSummary from '../../../Form/components/FormSummary';
import { useFormManagerStore } from '../../store';
import { PatternEditComponent } from '../types';

import {
  PatternEditForm,
  usePatternEditFormContext,
} from './common/PatternEditForm';

const FormSummaryEdit: PatternEditComponent<FormSummaryProps> = props => {
  const isSelected = useFormManagerStore(
    state => state.focus?.pattern.id === props.previewProps._patternId
  );
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
    <div className="grid-row grid-gap-1 edit-component-panel">
      <div className="desktop:grid-col-4 mobile:grid-col-12">
        <label className="usa-label">
          Title
          <input
            className="usa-input bg-primary-lighter text-bold"
            {...register(`${patternId}.data.title`)}
            type="text"
          ></input>
        </label>
      </div>
      <div className="desktop:grid-col-2 mobile:grid-col-12">
        <label className="usa-label">
          Description
          <textarea
            className="usa-textarea bg-primary-lighter text-bold"
            {...register(`${patternId}.data.description`)}
          ></textarea>
        </label>
      </div>
    </div>
  );
};

export default FormSummaryEdit;
