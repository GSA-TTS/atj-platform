import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { type PatternId, type PatternMap } from '@atj/forms';

import { useFormManagerStore } from '../../../store';

type PatternEditFormProps = {
  patternId: PatternId;
  editComponent: React.ReactNode;
};

export const PatternEditForm = ({
  patternId,
  editComponent,
}: PatternEditFormProps) => {
  const updatePatternById = useFormManagerStore(
    state => state.updatePatternById
  );
  const pattern = useFormManagerStore(state => state.form.patterns[patternId]);
  const editContext = useFormManagerStore(state => state.editContext);
  const methods = useForm<PatternMap>({
    defaultValues: {
      [patternId]: pattern,
    },
  });
  return (
    <FormProvider {...methods}>
      <form
        onBlur={methods.handleSubmit(formData => {
          updatePatternById(pattern.id, formData);
          methods.clearErrors();
          methods.setError;
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
