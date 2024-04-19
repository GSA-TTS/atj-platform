import classNames from 'classnames';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { PatternMap } from '@atj/forms';

import { PatternComponent } from '../../Form';

import { useFormEditStore } from './store';

export const PreviewPattern: PatternComponent = function PreviewPattern(props) {
  const { context, setFocus, updatePatternById } = useFormEditStore(state => ({
    context: state.context,
    setFocus: state.setFocus,
    updatePatternById: state.updatePatternById,
  }));
  const form = useFormEditStore(state => state.form);
  const focusedPattern = useFormEditStore(state => state.focusedPattern);

  const methods = useForm<PatternMap>({
    defaultValues: focusedPattern
      ? {
          [focusedPattern.id]: focusedPattern,
        }
      : {},
  });

  useEffect(() => {
    if (focusedPattern === undefined) {
      return;
    }
    methods.reset();
    methods.setValue(focusedPattern.id, focusedPattern);
  }, [focusedPattern]);

  const isSelected = focusedPattern?.id === props._patternId;
  const Component = context.components[props.type];
  const EditComponent = context.editComponents[props.type];

  const SelectedEditComponent = focusedPattern
    ? context.editComponents[focusedPattern.type]
    : undefined;

  return (
    <div
      className={classNames('form-group-row', {
        'field-selected': isSelected,
      })}
      data-id={props._patternId}
      onClick={event => {
        if (EditComponent) {
          event.stopPropagation();
          setFocus(props._patternId);
        }
      }}
      onFocus={event => {
        if (EditComponent) {
          event.stopPropagation();
          setFocus(props._patternId);
        }
      }}
    >
      {isSelected ? (
        <FormProvider {...methods}>
          <div>
            {SelectedEditComponent ? (
              <form
                onInput={methods.handleSubmit(formData => {
                  updatePatternById(props._patternId, formData);
                })}
              >
                <div className="border-1 radius-md border-primary-light padding-1">
                  <SelectedEditComponent
                    context={context}
                    form={form}
                    pattern={focusedPattern}
                  />
                </div>
              </form>
            ) : null}
          </div>
        </FormProvider>
      ) : (
        <Component {...props} />
      )}
    </div>
  );
};
