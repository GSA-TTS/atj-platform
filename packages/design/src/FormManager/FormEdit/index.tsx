import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { type FormService } from '@atj/form-service';
import {
  type FormDefinition,
  type FormElementMap,
  getRootFormElement,
  updateElements,
} from '@atj/forms';

import { type FormEditUIContext } from '../../config';
import InnerPageTopNav from '../internalPageTopNav';
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
  const methods = useForm<FormElementMap>({
    defaultValues: currentForm.elements,
  });
  const rootField = getRootFormElement(currentForm);
  const EditComponent = context.editComponents[rootField.type];
  return (
    <>
      <PreviewForm
        uiContext={context}
        form={currentForm}
        onFormElementSelected={id => {
          console.log('form element selected', id);
        }}
      />
      <hr />
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
          <h1>
            <span>Edit form interface</span>
            <span>
              <ButtonBar />
            </span>
          </h1>
          <h3 className="descriptionText text-normal">
            Editing form {currentForm.summary.title}
          </h3>
          <EditComponent
            context={context}
            form={currentForm}
            element={rootField}
          />
          <ButtonBar />
        </form>
      </FormProvider>
      );
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
