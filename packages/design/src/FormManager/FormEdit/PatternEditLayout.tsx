import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { type PatternId, type PatternMap } from '@atj/forms';

import { useFormEditStore, usePattern } from './store';

type PatternEditLayoutProps = {
  patternId: PatternId;
  viewComponent: React.ReactNode;
  editComponent: React.ReactNode;
};

export const PatternEditLayout = ({
  patternId,
  editComponent,
  viewComponent,
}: PatternEditLayoutProps) => {
  const { updatePatternById } = useFormEditStore(state => ({
    updatePatternById: state.updatePatternById,
  }));
  const pattern = usePattern(patternId);
  const methods = useForm<PatternMap>({
    defaultValues: {
      [patternId]: pattern,
    },
  });
  const focusedPattern = useFormEditStore(state => state.focusedPattern);
  const isSelected = focusedPattern?.id === patternId;

  return !isSelected ? (
    viewComponent
  ) : (
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
