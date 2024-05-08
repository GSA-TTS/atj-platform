import React from 'react';

import { type CheckboxProps, type PatternId } from '@atj/forms';
import { type CheckboxPattern } from '@atj/forms/src/patterns/checkbox';

import Checkbox from '../../../Form/components/Checkbox';
import { useFormManagerStore } from '../../store';
import { PatternEditComponent } from '../types';

import { PatternEditActions } from './common/PatternEditActions';
import { PatternEditForm } from './common/PatternEditForm';
import { usePatternEditFormContext } from './common/hooks';

const CheckboxPatternEdit: PatternEditComponent<CheckboxProps> = ({
  focus,
  previewProps,
}) => {
  return (
    <>
      {focus ? (
        <PatternEditForm
          pattern={focus.pattern}
          editComponent={<CheckboxEditComponent patternId={focus.pattern.id} />}
        ></PatternEditForm>
      ) : (
        <Checkbox {...previewProps} />
      )}
    </>
  );
};

const CheckboxEditComponent = ({ patternId }: { patternId: PatternId }) => {
  const pattern = useFormManagerStore(state => state.form.patterns[patternId]);
  const { fieldId, register } =
    usePatternEditFormContext<CheckboxPattern>(patternId);

  return (
    <div className="grid-row grid-gap">
      <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
        <label className="usa-label" htmlFor={fieldId('data.label')}>
          Field label
        </label>
        <input
          className="usa-input"
          id={fieldId('data.label')}
          defaultValue={pattern.data.initial}
          {...register('data.label')}
          type="text"
        ></input>
      </div>
      <div className="tablet:grid-col-6 mobile-lg:grid-col-12">
        <div className="usa-checkbox">
          <input
            id={fieldId('data.defaultChecked')}
            type="checkbox"
            {...register('data.defaultChecked')}
            className="usa-checkbox__input"
          />
          <label
            className="usa-checkbox__label"
            htmlFor={fieldId('data.defaultChecked')}
          >
            Default field value
          </label>
        </div>
      </div>
      <div className="grid-col-12">
        <PatternEditActions />
      </div>
    </div>
  );
};

export default CheckboxPatternEdit;
