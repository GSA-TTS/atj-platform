import React, { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { type PatternMap } from '@atj/forms';
import { useFormEditStore } from './store';

export const PatternEdit = () => {
  const context = useFormEditStore(state => state.context);
  const form = useFormEditStore(state => state.form);
  const focusedPattern = useFormEditStore(state => state.focusedPattern);
  const { setSelectedPattern, updateSelectedPattern } = useFormEditStore(
    state => ({
      setSelectedPattern: state.setSelectedPattern,
      updateSelectedPattern: state.updateSelectedPattern,
    })
  );

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

  const SelectedEditComponent = context.editComponents[focusedPattern.type];
  return (
    <FormProvider {...methods}>
      <div className="settingsContainer">
        {SelectedEditComponent ? (
          <form
            className="editForm"
            onSubmit={methods.handleSubmit(formData => {
              updateSelectedPattern(formData);
            })}
          >
            <SelectedEditComponent
              context={context}
              form={form}
              pattern={focusedPattern}
            />
            <p>
              <input className="usa-button" type="submit" value="Save" />
              <input
                onClick={() => setSelectedPattern(undefined)}
                className="usa-button close-button"
                type="submit"
                value="Cancel"
              />
            </p>
          </form>
        ) : null}
      </div>
    </FormProvider>
  );
};
