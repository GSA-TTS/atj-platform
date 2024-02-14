import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { type FormService } from '@atj/form-service';
import {
  type FormDefinition,
  type FormElementMap,
  getRootFormElement,
  updateElements,
} from '@atj/forms';

import { type FormUIContext } from '../../config';
import InnerPageTopNav from '../internalPageTopNav';

export default function FormEdit({
  context,
  formId,
  formService,
}: {
  context: FormUIContext;
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
      <EditForm
        context={context}
        formId={formId}
        formService={formService}
        form={form}
        onSave={form => formService.saveForm(formId, form)}
      />
    </div>
  );
}

const EditForm = ({
  context,
  form,
  onSave,
  formId,
  formService,
}: {
  context: FormUIContext;
  form: FormDefinition;
  onSave: (form: FormDefinition) => void;
  formId: string;
  formService: FormService;
}) => {
  const methods = useForm<FormElementMap>({
    defaultValues: form.elements,
  });
  const rootField = getRootFormElement(form);
  const Component = context.components[rootField.type];
  return (
    <FormProvider {...methods}>
      <form
        className="editForm"
        onSubmit={methods.handleSubmit(data => {
          const updatedForm = updateElements(context.config, form, data);
          onSave(updatedForm);
        })}
      >
        <InnerPageTopNav formId={formId} formService={formService} />
        <h1>
          <span>Edit form interface</span>
          <span>
            <ButtonBar />
          </span>
        </h1>
        <h3 className="descriptionText text-normal">
          Editing form {form.summary.title}
        </h3>
        <Component context={context} form={form} element={rootField} />
        <ButtonBar />
      </form>
    </FormProvider>
  );
};

const ButtonBar = () => {
  return (
    <div>
      <button className="usa-button margin-top-0">Save Changes</button>
    </div>
  );
};
