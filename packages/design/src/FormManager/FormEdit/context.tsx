import React, { createContext, useContext, useState } from 'react';

import {
  type FormConfig,
  type FormDefinition,
  type FormElement,
  type FormElementMap,
  updateFormElement,
} from '@atj/forms';

type PreviewContextValue = {
  actions: {
    updateSelectedFormElement: (formData: FormElementMap) => void;
  };
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

  const actions: PreviewContextValue['actions'] = {
    updateSelectedFormElement: formData => {
      if (selectedElement === undefined) {
        console.warn('No selected element');
        return;
      }
      const updatedForm = updateFormElement(
        config,
        form,
        selectedElement,
        formData
      );
      if (updatedForm) {
        setCurrentForm(updatedForm);
      }
    },
  };

  return (
    <PreviewContext.Provider
      value={{
        actions,
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
  return useContext(PreviewContext);
};
