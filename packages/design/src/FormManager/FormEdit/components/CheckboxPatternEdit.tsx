import React from 'react';

import { type CheckboxProps, type PatternId } from '@atj/forms';

import Checkbox from '../../../Form/components/Checkbox';
import { useFormManagerStore } from '../../store';
import { PatternEditComponent } from '../types';

import { PatternEditActions } from './common/PatternEditActions';
import {
  PatternEditForm,
  usePatternEditFormContext,
} from './common/PatternEditForm';

const CheckboxPatternEdit: PatternEditComponent<CheckboxProps> = props => {
  const isSelected = useFormManagerStore(
    state => state.focusedPattern?.id === props.previewProps._patternId
  );
  return (
    <>
      {isSelected ? (
        <PatternEditForm
          patternId={props.previewProps._patternId}
          editComponent={
            <CheckboxEditComponent patternId={props.previewProps._patternId} />
          }
        ></PatternEditForm>
      ) : (
        <Checkbox {...props.previewProps} />
      )}
    </>
  );
};

const CheckboxEditComponent = ({ patternId }: { patternId: PatternId }) => {
  const pattern = useFormManagerStore(state => state.form.patterns[patternId]);
  const methods = usePatternEditFormContext();

  return (
    <div className="grid-row grid-gap">
      <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
        <label className="usa-label" htmlFor={`${pattern.id}.data.label`}>
          Field label
        </label>
        <input
          className="usa-input"
          id={`${pattern.id}.data.label`}
          defaultValue={`${pattern.id}`}
          {...methods.register(`${pattern.id}.data.label`)}
          type="text"
        ></input>
      </div>
      <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
        <div className="usa-checkbox">
          <input
            id={`${pattern.id}.data.defaultChecked`}
            type="checkbox"
            {...methods.register(`${pattern.id}.data.defaultChecked`)}
            className="usa-checkbox__input"
          />
          <label
            className="usa-checkbox__label"
            htmlFor={`${pattern.id}.data.defaultChecked`}
          >
            Default field value
          </label>
        </div>
      </div>
      <div className="grid-col-12">
        <PatternEditActions>
          <span className="usa-checkbox">
            <input
              style={{ display: 'inline-block' }}
              className="usa-checkbox__input"
              type="checkbox"
              id={`${pattern.id}.data.required`}
              {...methods.register(`${pattern.id}.data.required`)}
            />
            <label
              style={{ display: 'inline-block' }}
              className="usa-checkbox__label"
              htmlFor={`${pattern.id}.data.required`}
            >
              Required
            </label>
          </span>
        </PatternEditActions>
      </div>
    </div>
  );
};

export default CheckboxPatternEdit;
