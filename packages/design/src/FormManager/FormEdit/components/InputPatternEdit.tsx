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

  const initial = getFieldState('data.initial');
  const label = getFieldState('data.label');
  const maxLength = getFieldState('data.maxLength');

  return (
    <div className="grid-row grid-gap-1 edit-component-panel">
      <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
        <label
          className={classnames('usa-label', {
            'usa-label--error': label.error,
          })}
          htmlFor={fieldId('data.label')}
        >
          Field label
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
          id={fieldId('data.label')}
          defaultValue={pattern.data.label}
          {...register('data.label')}
          type="text"
        ></input>
      </div>
      <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
        <label
          className={classnames('usa-label', {
            'usa-label--error': initial.error,
          })}
          htmlFor={fieldId('data.initial')}
        >
          Default field value
        </label>
        <input
          className="usa-input bg-primary-lighter text-bold"
          id={fieldId('data.initial')}
          type="text"
          {...register('data.initial')}
        ></input>
      </div>
      <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
        <label
          className={classnames('usa-label', {
            'usa-label--error': maxLength.error,
          })}
          htmlFor={fieldId('data.maxLength')}
        >
          Maximum length
        </label>
        <input
          className="usa-input bg-primary-lighter text-bold"
          id={fieldId('data.maxLength')}
          type="text"
          {...register('data.maxLength')}
        ></input>
      </div>
      <div className="grid-col-12">
        <PatternEditActions>
          <span className="usa-checkbox">
            <input
              style={{ display: 'inline-block' }}
              className="usa-checkbox__input bg-primary-lighter"
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

export default InputPatternEdit;
