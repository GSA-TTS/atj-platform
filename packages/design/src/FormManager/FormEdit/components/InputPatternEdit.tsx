import React from 'react';

import { PatternId, TextInputProps } from '@atj/forms';

import TextInput from '../../../Form/components/TextInput';
import { useIsPatternSelected, usePattern } from '../store';
import { PatternEditComponent } from '../types';

import { PatternEditActions } from './common/PatternEditActions';
import {
  PatternEditForm,
  usePatternEditFormContext,
} from './common/PatternEditForm';

const InputPatternEdit: PatternEditComponent<TextInputProps> = props => {
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
        <TextInput {...props.previewProps} />
      )}
    </>
  );
};

const EditComponent = ({ patternId }: { patternId: PatternId }) => {
  const pattern = usePattern(patternId);

  const methods = usePatternEditFormContext();
  return (
    <div className="grid-row grid-gap-1 edit-component-panel">
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
        <label className="usa-label" htmlFor={`${pattern.id}.data.default`}>
          Default field value
        </label>
        <input
          className="usa-input"
          id={`${pattern.id}.data.default`}
          type="text"
          {...methods.register(`${pattern.id}.data.default`)}
        ></input>
      </div>
      <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
        <label className="usa-label" htmlFor={`${pattern.id}.data.maxLength`}>
          Maximum length
        </label>
        <input
          className="usa-input"
          id={`${pattern.id}.data.maxLength`}
          type="text"
          {...methods.register(`${pattern.id}.data.maxLength`)}
        ></input>
      </div>
      <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
        <label className="usa-label" htmlFor={`${pattern.id}.type`}>
          Field type
        </label>
        <select
          className="usa-select"
          {...methods.register(`${pattern.id}.type`)}
          id={`${pattern.id}.type`}
        >
          <option value={'input'}>Input</option>
        </select>
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

export default InputPatternEdit;
