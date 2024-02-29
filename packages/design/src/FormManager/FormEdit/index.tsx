import React, { useEffect } from 'react';

import { type FormService } from '@atj/form-service';

import { type FormEditUIContext } from '../../config';
import { PreviewContextProvider, usePreviewContext } from './context';
import { FormElementEdit } from './FormElementEdit';
import { PreviewForm } from './Preview';
import { FormDefinition } from '@atj/forms';

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
      <PreviewContextProvider config={context.config} initialForm={form}>
        <EditForm
          context={context}
          saveForm={form => formService.saveForm(formId, form)}
        />
      </PreviewContextProvider>
    </div>
  );
}

const EditForm = ({
  context,
  saveForm,
}: {
  context: FormEditUIContext;
  saveForm: (form: FormDefinition) => void;
}) => {
  const { form, selectedElement } = usePreviewContext();
  useEffect(() => {
    saveForm(form);
  }, [form]);
  return (
    <div className="editFormContentWrapper">
      <div className="grid-row">
        <div className="grid-col-8">
          <PreviewForm uiContext={context} form={form} />
        </div>
        <div className={`grid-col-4 ${selectedElement ? 'show' : 'hide'}`}>
          <FormElementEdit context={context} />
        </div>
      </div>
    </div>
  );
};
