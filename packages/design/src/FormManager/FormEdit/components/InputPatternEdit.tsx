import React from 'react';
import { useFormContext } from 'react-hook-form';

import { type TextInputProps } from '@atj/forms';

import { PatternComponent } from '../../../Form';
import TextInput from '../../../Form/components/TextInput';

import { PatternEditActions } from '../PatternEditActions';
import { PatternEditForm } from '../PatternEditForm';
import { useFormEditStore } from '../store';

const InputPatternEdit: PatternComponent<TextInputProps> = props => {
  const { register } = useFormContext();
  const focusedPattern = useFormEditStore(state => state.focusedPattern);
  const showEditUI = focusedPattern?.id === props._patternId;
  return (
    <>
      {showEditUI ? (
        <div className="grid-col-12">
          <PatternEditForm>
            <div className="grid-row grid-gap">
              <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
                <label
                  className="usa-label"
                  htmlFor={`${props._patternId}.data.label`}
                >
                  Field label
                </label>
                <input
                  className="usa-input"
                  id={`${props._patternId}.data.label`}
                  defaultValue={`${props._patternId}`}
                  {...register(`${props._patternId}.data.label`)}
                  type="text"
                ></input>
              </div>
              <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
                <label
                  className="usa-label"
                  htmlFor={`${props._patternId}.data.default`}
                >
                  Default field value
                </label>
                <input
                  className="usa-input"
                  id={`${props._patternId}.data.default`}
                  type="text"
                  {...register(`${props._patternId}.data.default`)}
                ></input>
              </div>
              <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
                <label
                  className="usa-label"
                  htmlFor={`${props._patternId}.data.maxLength`}
                >
                  Maximum length
                </label>
                <input
                  className="usa-input"
                  id={`${props._patternId}.data.maxLength`}
                  type="text"
                  {...register(`${props._patternId}.data.maxLength`)}
                ></input>
              </div>
              <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
                <label
                  className="usa-label"
                  htmlFor={`${props._patternId}.type`}
                >
                  Field type
                </label>
                <select
                  className="usa-select"
                  {...register(`${props._patternId}.type`)}
                  id={`${props._patternId}.type`}
                >
                  <option value={'input'}>Input</option>
                </select>
              </div>
            </div>
          </PatternEditForm>
          <PatternEditActions>
            <span className="usa-checkbox">
              <input
                style={{ display: 'inline-block' }}
                className="usa-checkbox__input"
                type="checkbox"
                id={`${props._patternId}.data.required`}
                {...register(`${props._patternId}.data.required`)}
              />
              <label
                style={{ display: 'inline-block' }}
                className="usa-checkbox__label"
                htmlFor={`${props._patternId}.data.required`}
              >
                Required
              </label>
            </span>
          </PatternEditActions>
        </div>
      ) : (
        <TextInput
          _patternId={props._patternId}
          type="input"
          inputId={props._patternId}
          value={props.value}
          label={props.label}
          required={props.required}
        />
      )}
    </>
  );
};

export default InputPatternEdit;
