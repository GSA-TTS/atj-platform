import React, { useEffect } from 'react';

import { FormDefinition } from '@atj/forms';
import { type FormService } from '@atj/form-service';

import { type FormEditUIContext } from '../../config';
import { PreviewContextProvider, usePreviewContext } from './context';
import { FormElementEdit } from './FormElementEdit';
import { PreviewForm } from './Preview';

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
      <h1>Edit form</h1>
      <p className="usa-intro">Your form has been imported for web delivery.</p>
      <PreviewContextProvider config={context.config} initialForm={form}>
        <EditForm
          context={context}
          saveForm={form => formService.saveForm(formId, form)}
        />{' '}
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
    <div className="editFormContentWrapper position-relative">
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
