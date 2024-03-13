import React, { createContext, useContext, useState } from 'react';

import {
  type FormConfig,
  type FormDefinition,
  type FormElement,
  type FormElementMap,
  type Pattern,
  getFormElement,
  updateFormElement,
} from '@atj/forms';

type PreviewContextValue = {
  config: FormConfig;
  form: FormDefinition;
  setCurrentForm: (form: FormDefinition) => void;
  selectedElement?: FormElement;
  setSelectedElement: (element?: FormElement | undefined) => void;
  selectedElementTop: number;
  setSelectedElementTop: (top: number) => void;
  isSettingsVisible: boolean;
  setIsSettingsVisible: (isVisible: boolean) => void;
};

export const PreviewContext = createContext<PreviewContextValue>(
  null as unknown as PreviewContextValue
);

export const PreviewContextProvider = ({
  config,
  initialForm,
  children,
}: {
  config: FormConfig;
  initialForm: FormDefinition;
  children: React.ReactNode;
}) => {
  const [form, setCurrentForm] = useState(initialForm);
  const [selectedElement, setSelectedElement] = useState<FormElement>();
  const [selectedElementTop, setSelectedElementTop] = useState(0);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  return (
    <PreviewContext.Provider
      value={{
        config,
        form,
        setCurrentForm,
        selectedElement,
        setSelectedElement,
        selectedElementTop,
        setSelectedElementTop,
        isSettingsVisible,
        setIsSettingsVisible,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
};

export const usePreviewContext = () => {
  const context = useContext(PreviewContext);
  return {
    form: context.form,
    isSettingsVisible: context.isSettingsVisible,
    selectedElement: context.selectedElement,
    actions: {
      handleEditClick: (pattern: Pattern) => {
        if (context.selectedElement?.id === pattern._elementId) {
          context.setSelectedElement(undefined);
        } else {
          const element = document.querySelector(
            `[data-id="${pattern._elementId}"]`
          );
          if (element) {
            const rect = element.getBoundingClientRect();
            context.setSelectedElementTop(rect.top);
          }
          const elementToSet = getFormElement(context.form, pattern._elementId);
          context.setSelectedElement(elementToSet);
        }
        context.setIsSettingsVisible(true);
      },
      updateSelectedFormElement: (formData: FormElementMap) => {
        if (context.selectedElement === undefined) {
          console.warn('No selected element');
          return;
        }
        const updatedForm = updateFormElement(
          context.config,
          context.form,
          context.selectedElement,
          formData
        );
        if (updatedForm) {
          context.setCurrentForm(updatedForm);
        }
      },
      setSelectedElement: context.setSelectedElement,
    },
  };
};
