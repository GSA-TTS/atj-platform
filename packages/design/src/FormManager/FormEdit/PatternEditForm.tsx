import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { type PatternMap } from '@atj/forms';
import { useFormEditStore } from './store';

export const PatternEditForm = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const focusedPattern = useFormEditStore(state => state.focusedPattern);
  const { updateSelectedPattern } = useFormEditStore(state => ({
    updateSelectedPattern: state.updateSelectedPattern,
  }));

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

  if (!focusedPattern) {
    return;
  }

  return (
    <FormProvider {...methods}>
      <div>
        <form
          onSubmit={methods.handleSubmit(formData => {
            updateSelectedPattern(formData);
          })}
        >
          <div className="border-1 radius-md border-primary-light padding-1">
            {children}
          </div>
        </form>
      </div>
    </FormProvider>
  );
};
