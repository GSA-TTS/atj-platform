import classnames from 'classnames';
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
  const { fieldId, getFieldState, register } =
    usePatternEditFormContext<RadioGroupPattern>(pattern.id);
  const [options, setOptions] = useState(pattern.data.options);
  const label = getFieldState('label');

  return (
    <div className="grid-row grid-gap">
      <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
        <label
          className={classnames('usa-label', {
            'usa-label--error': label.error,
          })}
          htmlFor={fieldId('label')}
        >
          Radio group label
        </label>
        {label.error ? (
          <span className="usa-error-message" role="alert">
            {label.error.message}
          </span>
        ) : null}
        <input
          className="usa-input"
          id={fieldId('label')}
          defaultValue={pattern.data.label}
          {...register('label')}
          type="text"
        ></input>
      </div>
      <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
        {options.map((option, index) => {
          const optionId = getFieldState(`options.${index}.id`);
          const optionLabel = getFieldState(`options.${index}.label`);
          return (
            <div key={index}>
              {optionId.error ? (
                <span className="usa-error-message" role="alert">
                  {optionId.error.message}
                </span>
              ) : null}
              {optionLabel.error ? (
                <span className="usa-error-message" role="alert">
                  {optionLabel.error.message}
                </span>
              ) : null}
              <div className="display-flex">
                <input
                  className={classnames('usa-input', {
                    'usa-label--error': label.error,
                  })}
                  id={fieldId(`options.${index}.id`)}
                  {...register(`options.${index}.id`)}
                  defaultValue={option.id}
                />
                <input
                  className="usa-input"
                  id={fieldId(`options.${index}.label`)}
                  {...register(`options.${index}.label`)}
                  defaultValue={option.label}
                />
              </div>
            </div>
          );
        })}
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
        <PatternEditActions />
      </div>
    </div>
  );
};

export default RadioGroupPatternEdit;
