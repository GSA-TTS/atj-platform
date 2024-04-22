import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { type PatternId, type PatternMap } from '@atj/forms';

import { useFormEditStore } from '../../../store';

type PatternEditFormProps = {
  patternId: PatternId;
  editComponent: React.ReactNode;
};

export const PatternEditForm = ({
  patternId,
  editComponent,
}: PatternEditFormProps) => {
  const { updatePatternById } = useFormEditStore(state => ({
    updatePatternById: state.updatePatternById,
  }));
  const pattern = useFormEditStore(state => state.form.patterns[patternId]);
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
