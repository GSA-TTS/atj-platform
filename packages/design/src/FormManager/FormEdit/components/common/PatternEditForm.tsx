import React, { useEffect } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { type Pattern, type PatternMap } from '@atj/forms';

import { useFormManagerStore } from '../../../store';

type PatternEditFormProps = {
  pattern: Pattern;
  editComponent: React.ReactNode;
};

export const PatternEditForm = ({
  pattern,
  editComponent,
}: PatternEditFormProps) => {
  const updateActivePattern = useFormManagerStore(
    state => state.updateActivePattern
  );
  const focus = useFormManagerStore(state => state.focus);
  const methods = useForm<PatternMap>({
    defaultValues: {
      [pattern.id]: pattern,
    },
  });

  useEffect(() => {
    methods.clearErrors();
    Object.entries(focus?.errors || {}).forEach(([field, error]) => {
      methods.setError(field, { message: error });
    });
  }, [focus]);

  return (
    <FormProvider {...methods}>
      <form
        onBlur={methods.handleSubmit(formData => {
          updateActivePattern(formData);
        })}
      >
        <div className="border-1 radius-md border-primary-light padding-1">
          {editComponent}
        </div>
      </form>
    </FormProvider>
  );
};

export const usePatternEditFormContext = () => {
  return useFormContext<PatternMap>();
};
