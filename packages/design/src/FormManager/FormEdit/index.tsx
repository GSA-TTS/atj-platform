import React, { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { type FormService } from '@atj/form-service';
import {
  type FormDefinition,
  getRootFormElement,
  FormElementId,
  getFormElement,
} from '@atj/forms';

import { type FormEditUIContext } from '../../config';
import { PreviewContext, PreviewForm } from './Preview';
import { FormElementEdit } from './FormElementEdit';

export default function FormEdit({
  context,
  formId,
  formService,
}: {
  context: FormEditUIContext;
  formId: string;
  formService: FormService;
}) {
  const result = formService.getForm(formId);
  if (!result.success) {
    return 'Form not found';
  }
  const form = result.data;
  const customBaseUrl = window.location.href + "/#top";

  return (
    <div className="editFormPage">
      <h1>Form Editor Portal</h1>
      <p className="usa-intro">
        Welcome to the Form Editor Portal, where you can effortlessly
        personalize your form by modifying labels, attributes, and other
        settings to better suit your needs.
      </p>
      <EditForm
        context={context}
        initialForm={form}
        onSave={form => formService.saveForm(formId, form)}
      />
    </div>
  );
}

const EditForm = ({
  context,
  initialForm,
  //onSave,
}: {
  context: FormEditUIContext;
  initialForm: FormDefinition;
  //onSave: (form: FormDefinition) => void;
}) => {
  const [currentForm, setCurrentForm] = useState(initialForm);
  const [selectedId, setSelectedId] = useState<FormElementId | null>(null);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const rootField = getRootFormElement(currentForm);
  const formElement = getFormElement(currentForm, selectedId || rootField.id);
  const settingsContainerRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLHeadingElement>(null);

  const handleSelect = (id: FormElementId | null) => {
    setSelectedId(id);
    setIsSettingsVisible(selectedId !== id || !isSettingsVisible);

    if (firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  };

  const handleClose = () => {
    setIsSettingsVisible(false);
    setSelectedId(null);
  };
  
  useEffect(() => {
    let frameId: number;
    
    const updatePosition = () => {
      if (window.innerWidth > 879) { // Only update position for non-mobile screens
        if (selectedId && settingsContainerRef.current) {
          const element = document.querySelector<HTMLDivElement>(`.form-group-row[data-id="${selectedId}"]`);
          if (element) {
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
  }, [selectedId]);

  return (
    <>
    <div className="editFormContentWrapper position-relative">
      <div className="grid-row">
        <div className="grid-col grid-col-8">
          <PreviewContext.Provider
            value={{
              selectedId,
              setSelectedId: handleSelect
            }}
          >
            <PreviewForm uiContext={context} form={currentForm} />
          </PreviewContext.Provider>
        </div>
        {isSettingsVisible && (
        <div className={`grid-col grid-col-4 ${selectedId !== null ? "show" : "hide"}`}>
          <div ref={settingsContainerRef} className="settingsContainer position-sticky">
            <h2 ref={firstFocusableRef}>Editing {selectedId}...</h2>
            {formElement && (
              <FormElementEdit
                key={selectedId}
                context={context}
                initialForm={currentForm}
                formElement={formElement}
                onChange={function (form: FormDefinition): void {
                  setCurrentForm(form);
                }}
              />
            )}
            <button 
              className="usa-button close-button"
              onClick={handleClose}
              aria-label="Close settings"
            >
              Cancel
            </button>
          </div>

        </div>
        )}
      </div>
    </div>

    </>
  );
};
