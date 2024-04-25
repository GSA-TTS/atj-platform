import React from 'react';

import { PatternId, type FieldsetProps } from '@atj/forms';
import { FieldsetPattern } from '@atj/forms/src/patterns/fieldset';

import Fieldset from '../../../Form/components/Fieldset';
import { useIsPatternSelected, usePattern } from '../store';
import { PatternEditComponent } from '../types';

import { PatternEditActions } from './common/PatternEditActions';
import {
  PatternEditForm,
  usePatternEditFormContext,
} from './common/PatternEditForm';

const FieldsetEdit: PatternEditComponent<FieldsetProps> = props => {
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
        <FieldsetPreview {...props.previewProps} />
      )}
    </>
  );
};

const FieldsetPreview = (props: FieldsetProps) => {
  const pattern = usePattern<FieldsetPattern>(props._patternId);

  return (
    <>
      <Fieldset {...(props as FieldsetProps)}>
        {pattern && pattern.data.patterns.length === 0 &&
          <div className="usa-alert usa-alert--warning usa-alert--no-icon margin-bottom-3">
            <div className="usa-alert__body">
              <p className="usa-alert__text">
                <span className="alert-text">Empty sections will not display.</span>
                <span className="action-text add-question">
                  <a className="usa-link" href="#">Add question</a>
                </span>
                <span className="action-text remove-section">
                  <a className="usa-link" href="#">Remove section</a>
                </span>
              </p>
            </div>
          </div>
        }
      </Fieldset>

    </>
  );
};

const EditComponent = ({ patternId }: { patternId: PatternId }) => {
  const pattern = usePattern(patternId);
  const { register } = usePatternEditFormContext();
  return (

    <div className="grid-row edit-component-panel">
      <div className="grid-col-12 margin-bottom-3 flex-align-self-end">
        <label className="usa-label width-full maxw-full">
          Legend Text Element
          <input
            className="usa-input"
            {...register(`${patternId}.data.legend`)}
            type="text"
          ></input>
        </label>
      </div>
      <div className="grid-col-12 margin-bottom-3 flex-align-self-end">
        <label className="usa-label width-full maxw-full">
          Subheader Text Element
          <input
            className="usa-input"
            {...register(`${patternId}.data.subheader`)}
            type="text"
          ></input>
        </label>
      </div>
      {/* <Fieldset type="fieldset" _patternId={patternId} /> */}
      <PatternEditActions />
    </div>
  );
};

export default FieldsetEdit;