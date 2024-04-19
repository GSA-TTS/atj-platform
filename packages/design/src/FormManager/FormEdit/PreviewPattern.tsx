import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { PatternMap } from '@atj/forms';

import { PatternComponent } from '../../Form';

import { useFormEditStore, usePattern } from './store';

export const PreviewPattern: PatternComponent = function PreviewPattern(props) {
  const { context, setFocus, updatePatternById } = useFormEditStore(state => ({
    context: state.context,
    setFocus: state.setFocus,
    updatePatternById: state.updatePatternById,
  }));
  const form = useFormEditStore(state => state.form);
  const focusedPattern = useFormEditStore(state => state.focusedPattern);
  const pattern = usePattern(props._patternId);
  const methods = useForm<PatternMap>({
    defaultValues: {
      [pattern.id]: pattern,
    },
  });

  const isSelected = focusedPattern?.id === props._patternId;
  const Component = context.components[props.type];
  const EditComponent = context.editComponents[props.type];

  const handleSubmit = methods.handleSubmit(formData => {
    updatePatternById(props._patternId, formData);
  });

  return (
    <div
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
          <form onBlur={handleSubmit}>
            <div className="border-1 radius-md border-primary-light padding-1">
              <EditComponent context={context} form={form} pattern={pattern} />
            </div>
          </form>
        </FormProvider>
      ) : (
        <Component {...props} />
      )}
    </div>
  );
};
