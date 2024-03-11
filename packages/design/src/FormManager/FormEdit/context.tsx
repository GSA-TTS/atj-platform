import React, { createContext, useContext, useState } from 'react';

import {
  type FormConfig,
  type FormDefinition,
  type FormElement,
  getFirstFormElement,
} from '@atj/forms';

type PreviewContextValue = {
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
  const element = getFirstFormElement(config, form);
  //TODO: replace '(undefined)' with '(element)' if we decide to make first field selected on page load
  const [selectedElement, setSelectedElement] = useState<FormElement | undefined>(undefined); 
  const [selectedElementTop, setSelectedElementTop] = useState(0);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  
  if (!element) {
    throw new Error('Form has no elements');
  }

  return (
    <PreviewContext.Provider
      value={{
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
