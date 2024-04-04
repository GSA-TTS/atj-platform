import React, { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { type PatternMap } from '@atj/forms';
import { useFormEditStore } from './store';

export const PatternEdit = () => {
  const context = useFormEditStore(state => state.context);
  const form = useFormEditStore(state => state.form);
  const selectedPattern = useFormEditStore(state => state.selectedPattern);
  const { setSelectedPattern, updateSelectedPattern } = useFormEditStore(
    state => ({
      setSelectedPattern: state.setSelectedPattern,
      updateSelectedPattern: state.updateSelectedPattern,
    })
  );

  const methods = useForm<PatternMap>({
    defaultValues: selectedPattern
      ? {
          [selectedPattern.id]: selectedPattern,
        }
      : {},
  });
  const settingsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedPattern === undefined) {
      return;
    }
    methods.reset();
    methods.setValue(selectedPattern.id, selectedPattern);
  }, [selectedPattern]);

  // Updates the scroll position of the edit form when it's visible
  useEffect(() => {
    let frameId: number;
    const updatePosition = () => {
      if (window.innerWidth > 879) {
        if (selectedPattern) {
          const element = document.querySelector(
            `[data-id="${selectedPattern.id}"]`
          );
          if (element && settingsContainerRef.current) {
            const rect = element.getBoundingClientRect();
            settingsContainerRef.current.style.top = `${rect.top}px`;
          }
        }
      }
      frameId = requestAnimationFrame(updatePosition);
    };
    frameId = requestAnimationFrame(updatePosition);
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [selectedPattern]);

  if (!selectedPattern) {
    return;
  }

  const SelectedEditComponent = context.editComponents[selectedPattern.type];
  return (
    <FormProvider {...methods}>
      <div
        ref={settingsContainerRef}
        className="settingsContainer position-sticky"
      >
        {SelectedEditComponent ? (
          <form
            className="editForm"
            onSubmit={methods.handleSubmit(formData => {
              updateSelectedPattern(formData);
            })}
          >
            <h3>Editing &quot;{selectedPattern.data.label}&quot;...</h3>
            <SelectedEditComponent
              context={context}
              form={form}
              pattern={selectedPattern}
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
