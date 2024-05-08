import React, { useState } from 'react';

import { type RadioGroupProps } from '@atj/forms';
import { type RadioGroupPattern } from '@atj/forms/src/patterns/radio-group';

import RadioGroup from '../../../Form/components/RadioGroup';
import { PatternEditComponent } from '../types';

import { PatternEditActions } from './common/PatternEditActions';
import { PatternEditForm } from './common/PatternEditForm';
import { usePatternEditFormContext } from './common/hooks';

const RadioGroupPatternEdit: PatternEditComponent<RadioGroupProps> = ({
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
        <RadioGroup {...previewProps} />
      )}
    </>
  );
};

const EditComponent = ({ pattern }: { pattern: RadioGroupPattern }) => {
  const { fieldId, register } = usePatternEditFormContext<RadioGroupPattern>(
    pattern.id
  );
  const [options, setOptions] = useState(pattern.data.options);

  return (
    <div className="grid-row grid-gap">
      <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
        <label className="usa-label" htmlFor={`${pattern.id}.data.label`}>
          Radio group label
        </label>
        <input
          className="usa-input"
          id={fieldId('data.label')}
          defaultValue={pattern.data.label}
          {...register('data.label')}
          type="text"
        ></input>
      </div>
      <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
        {options.map((option, index) => (
          <div key={index} className="display-flex">
            <input
              className="usa-input"
              id={fieldId('data.options.${index}.id')}
              {...register(`data.options.${index}.id`)}
            />
            <input
              className="usa-input"
              id={fieldId('data.options.${index}.label')}
              {...register(`data.options.${index}.label`)}
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
              id={fieldId('data.required')}
              {...register('data.required')}
            />
            <label
              style={{ display: 'inline-block' }}
              className="usa-checkbox__label"
              htmlFor={fieldId('data.required')}
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
