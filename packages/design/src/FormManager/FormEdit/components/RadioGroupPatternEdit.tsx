import React, { useState } from 'react';

import { type RadioGroupProps, type PatternId } from '@atj/forms';

import RadioGroup from '../../../Form/components/RadioGroup';
import { useFormManagerStore } from '../../store';
import { PatternEditComponent } from '../types';

import { PatternEditActions } from './common/PatternEditActions';
import {
  PatternEditForm,
  usePatternEditFormContext,
} from './common/PatternEditForm';
import { type RadioGroupPattern } from '@atj/forms/src/patterns/radio-group';

const RadioGroupPatternEdit: PatternEditComponent<RadioGroupProps> = props => {
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
        <RadioGroup {...props.previewProps} />
      )}
    </>
  );
};

const EditComponent = ({ patternId }: { patternId: PatternId }) => {
  const pattern = useFormManagerStore(
    state => state.form.patterns[patternId]
  ) as RadioGroupPattern;
  const methods = usePatternEditFormContext();
  const [options, setOptions] = useState(pattern.data.options);

  return (
    <div className="grid-row grid-gap">
      <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
        <label className="usa-label" htmlFor={`${pattern.id}.data.label`}>
          Radio group label
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
        {options.map((option, index) => (
          <div key={index} className="display-flex">
            <input
              className="usa-input"
              id={`${pattern.id}.data.options.${index}.id`}
              {...methods.register(`${pattern.id}.data.options.${index}.id`)}
            />
            <input
              className="usa-input"
              id={`${pattern.id}.data.options.${index}.label`}
              {...methods.register(`${pattern.id}.data.options.${index}.label`)}
            />
          </div>
        ))}
        <button
          className="usa-button usa-button--outline"
          onClick={event => {
            event.preventDefault();
            const optionId = `${options.length + 1}`;
            setOptions(options.concat({ id: optionId, label: optionId }));
          }}
        >
          Add new
        </button>
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

export default RadioGroupPatternEdit;
