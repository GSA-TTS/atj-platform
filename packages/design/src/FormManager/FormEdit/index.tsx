import React, { createContext, useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { type FormService } from '@atj/form-service';
import {
  type FormDefinition,
  type FormElementMap,
  getRootFormElement,
  updateElements,
} from '@atj/forms';

import RenderField from './FormElementEdit/RenderField';
import InnerPageTopNav from '../internalPageTopNav';

export default function FormEdit({
  formId,
  formService,
}: {
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
        formId={formId} 
        formService={formService}
        form={form}
        onSave={form => formService.saveForm(formId, form)}
      />
    </div>
  );
}

// FIXME: Once we clean up the input type, this function should be unnecessary.
const getFormFieldMap = (elements: FormElementMap) => {
  return Object.values(elements).reduce((acc, element) => {
    if (element.type === 'input') {
      acc[element.id] = {
        type: 'input',
        id: element.id,
        text: element.text,
        initial: element.initial.toString(),
        required: element.required,
      };
      return acc;
    } else if (element.type === 'sequence') {
      acc[element.id] = {
        type: 'sequence',
        id: element.id,
        elements: element.elements,
      };
      return acc;
    } else {
      const _exhaustiveCheck: never = element;
      return _exhaustiveCheck;
    }
  }, {} as FormElementMap);
};

const EditForm = ({
  form,
  onSave,
  formId,
  formService,
}: {
  form: FormDefinition;
  onSave: (form: FormDefinition) => void;
  formId: string;
  formService: FormService;
}) => {
  const formElements: FormElementMap = getFormFieldMap(form.elements);
  const methods = useForm<FormElementMap>({
    defaultValues: formElements,
  });
  const rootField = getRootFormElement(form);
  return (
    <FormProvider {...methods}>
      <form className="editForm"
        onSubmit={methods.handleSubmit(data => {
          const updatedForm = updateElements(form, data);
          onSave(updatedForm);
        })}
      >
        <InnerPageTopNav formId={formId} formService={formService} />
        <h1>
          <span>Edit form interface</span>
          <span><ButtonBar /></span>
        </h1>
        <h3 className="descriptionText text-normal">Editing form {form.summary.title}</h3>       
        <RenderField form={form} element={rootField} />
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
