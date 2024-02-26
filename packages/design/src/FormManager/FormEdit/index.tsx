import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { type FormService } from '@atj/form-service';
import {
  type FormDefinition,
  type FormElementMap,
  getRootFormElement,
  updateElements,
  FormElementId,
  getFormElement,
} from '@atj/forms';

import { type FormEditUIContext } from '../../config';
import InnerPageTopNav from '../internalPageTopNav';
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
      <InnerPageTopNav formId={formId} formService={formService} />
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
  onSave,
}: {
  context: FormEditUIContext;
  initialForm: FormDefinition;
  onSave: (form: FormDefinition) => void;
}) => {
  const [currentForm, setCurrentForm] = useState(initialForm);
  const [selectedId, setSelectedId] = useState<FormElementId>();
  const rootField = getRootFormElement(currentForm);
  const formElement = getFormElement(currentForm, selectedId || rootField.id);
  return (
    <>
      <ButtonBar />
      <div className="grid-row">
        <div className="grid-col-6">
          <PreviewContext.Provider
            value={{
              selectedId,
              setSelectedId: id => {
                setSelectedId(id);
              },
            }}
          >
            <PreviewForm uiContext={context} form={currentForm} />
          </PreviewContext.Provider>
        </div>
        <div className="grid-col-6">
          <h2>Editing {selectedId}...</h2>
          {formElement && (
            <FormElementEdit
              context={context}
              initialForm={currentForm}
              formElement={formElement}
              onChange={(form: FormDefinition) => {
                //setCurrentForm(form);
                console.log('setting form onChange', form);
              }}
            />
          )}
          <hr />
          {/*
          <div className="editForm">
            <FormProvider {...methods}>
              <form
                className="editForm"
                onSubmit={methods.handleSubmit(data => {
                  const updatedForm = updateElements(
                    context.config,
                    currentForm,
                    data
                  );
                  setCurrentForm(updatedForm);
                  onSave(updatedForm);
                })}
              >
                <EditComponent
                  context={context}
                  form={currentForm}
                  element={rootField}
                />
              </form>
            </FormProvider>
          </div>
          */}
        </div>
      </div>
    </>
  );
};

const ButtonBar = () => {
  return (
    <div>
      <button className="usa-button margin-top-0">Save Changes</button>
    </div>
  );
};
