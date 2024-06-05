import React from 'react';

import { type PatternId, type FieldsetProps } from '@atj/forms';

import { PatternComponent } from '../../../Form';
import Fieldset from '../../../Form/components/Fieldset';
import { useFormManagerStore } from '../../store';
import { PatternEditComponent } from '../types';

import { PatternEditActions } from './common/PatternEditActions';
import { PatternEditForm } from './common/PatternEditForm';
import { usePatternEditFormContext } from './common/hooks';
import { FieldsetPattern } from '@atj/forms/src/patterns/fieldset';
import classNames from 'classnames';

const FieldsetEdit: PatternEditComponent<FieldsetProps> = ({
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
        <FieldsetPreview {...previewProps} />
      )}
    </>
  );
};

const FieldsetPreview: PatternComponent<FieldsetProps> = props => {
  const pattern = useFormManagerStore(
    state => state.session.form.patterns[props._patternId]
  );
  return (
    <>
      <Fieldset {...(props as FieldsetProps)}>
        {pattern && pattern.data.patterns.length === 0 && (
          <div className="usa-alert usa-alert--warning usa-alert--no-icon margin-bottom-3">
            <div className="usa-alert__body">
              <p className="usa-alert__text">
                <span className="alert-text display-inline-block text-top margin-right-2">
                  Empty sections will not display.
                </span>
                <span className="action-text add-question display-inline-block margin-right-2">
                  <a className="usa-link" href="#">
                    Add question
                  </a>
                </span>
                <span className="action-text remove-section display-inline-block text-top margin-right-2">
                  <a className="usa-link" href="#">
                    Remove section
                  </a>
                </span>
              </p>
            </div>
          </div>
        )}
        {props.children}
      </Fieldset>
    </>
  );
};

const EditComponent = ({ patternId }: { patternId: PatternId }) => {
  const pattern = useFormManagerStore<FieldsetPattern>(
    state => state.session.form.patterns[patternId]
  );
  const { fieldId, getFieldState, register } =
    usePatternEditFormContext<FieldsetPattern>(patternId);
  const legend = getFieldState('legend');
  return (
    <div className="grid-row">
      <div className="grid-col-12 margin-bottom-3 flex-align-self-end">
        <label
          className={classNames('usa-label width-full maxw-full', {
            'usa-label--error': legend.error,
          })}
          htmlFor={fieldId('legend')}
        >
          Legend Text Element
          {legend.error ? (
            <span className="usa-error-message" role="alert">
              {legend.error.message}
            </span>
          ) : null}
          <input
            className={classNames('usa-input bg-primary-lighter text-bold', {
              'usa-input--error': legend.error,
            })}
            id={fieldId('legend')}
            defaultValue={pattern.data.legend}
            {...register('legend')}
            type="text"
          ></input>
        </label>
      </div>
      <Fieldset type="fieldset" _patternId={patternId} />
      <PatternEditActions />
    </div>
  );
};

export default FieldsetEdit;
