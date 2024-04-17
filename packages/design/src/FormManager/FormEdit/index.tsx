import React, { useEffect } from 'react';

import { Blueprint } from '@atj/forms';
import { type FormService } from '@atj/form-service';

import ManagerNav from '../ManagerNav';

import { AddPattern } from './AddPattern';
import { PreviewForm } from './Preview';
import { FormEditProvider, useFormEditStore } from './store';
import { type FormEditUIContext } from './types';

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
    <>
      <ManagerNav />
      <h1>Edit form</h1>
      <p className="usa-intro">Your form has been imported for web delivery.</p>
      <FormEditProvider context={context} form={form}>
        <EditForm saveForm={form => formService.saveForm(formId, form)} />
      </FormEditProvider>
    </>
  );
}

const EditForm = ({ saveForm }: { saveForm: (form: Blueprint) => void }) => {
  const { form } = useFormEditStore();
  useEffect(() => {
    saveForm(form);
  }, [form]);

  return (
    <div className="position-relative">
      <div className="grid-row">
        <div className="grid-col-12">
          <AddPattern />
        </div>
      </div>
      <div className="grid-row">
        <div className="grid-col-12">
          <PreviewForm />
        </div>
      </div>
    </div>
  );
};
