import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { type Pattern, type PatternMap } from '@atj/forms';
import { useFormEditStore } from './store';

export const PatternEdit = ({ pattern }: { pattern: Pattern }) => {
  const context = useFormEditStore(state => state.context);
  const form = useFormEditStore(state => state.form);
  const { updatePatternById } = useFormEditStore(state => ({
    updatePatternById: state.updatePatternById,
  }));

  const methods = useForm<PatternMap>({
    defaultValues: {
      [pattern.id]: pattern,
    },
  });

  const SelectedEditComponent = context.editComponents[pattern.type];
  return (
    <FormProvider {...methods}>
      <div>
        {SelectedEditComponent ? (
          <form
            onInput={methods.handleSubmit(formData => {
              console.log('submitting');
              updatePatternById(pattern.id, formData);
            })}
          >
            <div className="border-1 radius-md border-primary-light padding-1">
              <SelectedEditComponent
                context={context}
                form={form}
                pattern={pattern}
              />
            </div>
          </form>
        ) : (
          <div>Hello</div>
        )}
      </div>
    </FormProvider>
  );
};
