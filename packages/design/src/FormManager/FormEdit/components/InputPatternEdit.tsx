import classnames from 'classnames';
import React from 'react';

import { PatternId, TextInputProps } from '@atj/forms';
import { InputPattern } from '@atj/forms/src/patterns/input';

import TextInput from '../../../Form/components/TextInput';
import { useFormManagerStore } from '../../store';
import { PatternEditComponent } from '../types';

import { PatternEditActions } from './common/PatternEditActions';
import { PatternEditForm } from './common/PatternEditForm';
import { usePatternEditFormContext } from './common/hooks';
import { en as message } from '@atj/common/src/locales/en/app';

const InputPatternEdit: PatternEditComponent<TextInputProps> = ({
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
        <TextInput {...previewProps} />
      )}
    </>
  );
};

const EditComponent = ({ patternId }: { patternId: PatternId }) => {
  const pattern = useFormManagerStore<InputPattern>(
    state => state.form.patterns[patternId]
  );
  const { fieldId, register, getFieldState } =
    usePatternEditFormContext<InputPattern>(patternId);

  const initial = getFieldState('initial');
  const label = getFieldState('label');
  const maxLength = getFieldState('maxLength');

  return (
    <div className="grid-row grid-gap-1 edit-component-panel">
      <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
        <label
          className={classnames('usa-label', {
            'usa-label--error': label.error,
          })}
          htmlFor={fieldId('label')}
        >
          {message.patterns.input.fieldLabel}
        </label>
        {label.error ? (
          <span className="usa-error-message" role="alert">
            {label.error.message}
          </span>
        ) : null}
        <input
          className={classnames('usa-input bg-primary-lighter text-bold', {
            'usa-input--error': label.error,
          })}
          id={fieldId('label')}
          defaultValue={pattern.data.label}
          {...register('label')}
          type="text"
        ></input>
      </div>
      <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
        <label
          className={classnames('usa-label', {
            'usa-label--error': initial.error,
          })}
          htmlFor={fieldId('initial')}
        >
          {message.patterns.input.defaultFieldValue}
        </label>
        <input
          className="usa-input bg-primary-lighter text-bold"
          id={fieldId('initial')}
          type="text"
          {...register('initial')}
        ></input>
      </div>
      <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
        <label
          className={classnames('usa-label', {
            'usa-label--error': maxLength.error,
          })}
          htmlFor={fieldId('maxLength')}
        >
          {message.patterns.input.maxLength}
        </label>
        <input
          className="usa-input bg-primary-lighter text-bold"
          id={fieldId('maxLength')}
          type="text"
          {...register('maxLength')}
        ></input>
      </div>
      <div className="grid-col-12">
        <PatternEditActions>
          <span className="usa-checkbox">
            <input
              style={{ display: 'inline-block' }}
              className="usa-checkbox__input bg-primary-lighter"
              type="checkbox"
              id={fieldId('required')}
              {...register('required')}
              defaultChecked={pattern.data.required}
            />
            <label
              style={{ display: 'inline-block' }}
              className="usa-checkbox__label"
              htmlFor={fieldId('required')}
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
