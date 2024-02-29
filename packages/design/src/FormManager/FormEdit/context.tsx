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
  selectedElement: FormElement;
  setSelectedElement: (element: FormElement) => void;
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
  if (!element) {
    throw new Error('Form has no elements');
  }
  const [selectedElement, setSelectedElement] = useState<FormElement>(element);
  return (
    <PreviewContext.Provider
      value={{
        form,
        setCurrentForm,
        selectedElement,
        setSelectedElement,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
};

export const usePreviewContext = () => {
  return useContext(PreviewContext);
};
