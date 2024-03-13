import React, { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { type FormElementMap } from '@atj/forms';
import { FormEditUIContext } from '../../config';
import { usePreviewContext } from './context';

export const FormElementEdit = ({
  context,
}: {
  context: FormEditUIContext;
}) => {
  const {
    actions,
    form,
    selectedElement,
    setSelectedElement,
    isSettingsVisible,
  } = usePreviewContext();
  const handleClose = () => {
    setSelectedElement(undefined);
  };

  const methods = useForm<FormElementMap>({
    defaultValues: selectedElement
      ? {
          [selectedElement.id]: selectedElement,
        }
      : {},
  });
  const settingsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedElement === undefined) {
      return;
    }
    methods.setValue(selectedElement.id, selectedElement);
  }, [selectedElement]);

  // Updates the scroll position of the edit form when it's visible
  useEffect(() => {
    let frameId: number;

    const updatePosition = () => {
      if (window.innerWidth > 879) {
        if (selectedElement) {
          const element = document.querySelector(
            `[data-id="${selectedElement.id}"]`
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
  }, [selectedElement]);

  if (!selectedElement || !isSettingsVisible) {
    return;
  }

  const SelectedEditComponent = context.editComponents[selectedElement.type];
  return (
    <FormProvider {...methods}>
      <div
        ref={settingsContainerRef}
        className="settingsContainer position-sticky"
      >
        <form
          className="editForm"
          onSubmit={methods.handleSubmit(formData => {
            actions.updateSelectedFormElement(formData);
          })}
        >
          <h3>Editing &quot;{selectedElement.data.label}&quot;...</h3>
          <SelectedEditComponent
            context={context}
            form={form}
            element={selectedElement}
          />
          <p>
            <input className="usa-button" type="submit" value="Save" />
            <input
              onClick={handleClose}
              className="usa-button close-button"
              type="submit"
              value="Cancel"
            />
          </p>
        </form>
      </div>
    </FormProvider>
  );
};
