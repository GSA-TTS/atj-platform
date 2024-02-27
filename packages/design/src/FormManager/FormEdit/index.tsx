import React, { useState } from 'react';

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

  const handleSelect = (id: FormElementId | null) => {
    setSelectedId(id); // Always update the selectedId
    setIsSettingsVisible(selectedId !== id || !isSettingsVisible);
  };

  return (
    <>
      <div className="editFormContentWrapper">
        <div className="grid-row">
          <div className="grid-col-8">
            <PreviewContext.Provider
              value={{
                selectedId,
                setSelectedId: handleSelect,
              }}
            >
              <PreviewForm uiContext={context} form={currentForm} />
            </PreviewContext.Provider>
          </div>
          {isSettingsVisible && (
            <div
              className={`grid-col-4 ${selectedId !== null ? 'show' : 'hide'}`}
            >
              <div className="settingsContainer">
                <h2>Editing {selectedId}...</h2>
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
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
