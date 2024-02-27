import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  FormDefinition,
  FormElement,
  FormElementMap,
  updateElement,
} from '@atj/forms';
import { FormEditUIContext } from '../../config';

export const FormElementEdit = ({
  context,
  initialForm,
  formElement,
  onChange,
}: {
  context: FormEditUIContext;
  initialForm: FormDefinition;
  formElement: FormElement;
  onChange: (form: FormDefinition) => void;
}) => {
  const methods = useForm<FormElementMap>({
    defaultValues: {
      [formElement.id]: formElement,
    },
  });
  const SelectedEditComponent = context.editComponents[formElement.type];
  return (
    <FormProvider {...methods}>
      <form
        className="editForm"
        onSubmit={methods.handleSubmit(formData => {
          const updatedForm = updateElement(
            context.config,
            initialForm,
            formElement.id,
            formData
          );
          //onChange(updatedForm);
        })}
      >      
        <SelectedEditComponent
          context={context}
          form={initialForm}
          element={formElement}
        />
        <p>
          <input className="usa-button" type="submit" value="Save" />
        </p>    
      </form>
    </FormProvider>
  );
};
