import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { type FormService } from '@atj/form-service';
import {
  type FormDefinition,
  type FormElementMap,
  type FormConfig,
  getRootFormElement,
  updateElements,
} from '@atj/forms';

import { getEditComponentForFormElement } from '../../user';

export default function FormEdit({
  config,
  formId,
  formService,
}: {
  config: FormConfig;
  formId: string;
  formService: FormService;
}) {
  const result = formService.getForm(formId);
  if (!result.success) {
    return 'Form not found';
  }
  const form = result.data;
  return (
    <div>
      <h1>Edit form interface</h1>
      <div>Editing form {formId}</div>
      <ul>
        <li>
          <Link to={`/${formId}`}>Preview this form</Link>
        </li>
        <li>
          <Link to={`/${formId}/import-document`}>Import document</Link>
        </li>
        <li>
          <Link to="/">View all forms</Link>
        </li>
      </ul>
      <EditForm
        config={config}
        form={form}
        onSave={form => formService.saveForm(formId, form)}
      />
    </div>
  );
}

const EditForm = ({
  config,
  form,
  onSave,
}: {
  config: FormConfig;
  form: FormDefinition;
  onSave: (form: FormDefinition) => void;
}) => {
  const methods = useForm<FormElementMap>({
    defaultValues: form.elements,
  });
  const rootField = getRootFormElement(form);
  const Component = getEditComponentForFormElement(rootField.type);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(data => {
          const updatedForm = updateElements(config, form, data);
          onSave(updatedForm);
        })}
      >
        <ButtonBar />
        <Component config={config} form={form} element={rootField} />
        <ButtonBar />
      </form>
    </FormProvider>
  );
};

const ButtonBar = () => {
  return (
    <div>
      <button className="usa-button">Save</button>
    </div>
  );
};
