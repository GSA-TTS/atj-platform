import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  FormDefinition,
  FormElement,
  FormElementMap,
  getFormElementConfig,
  updateElement,
  validateElement,
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
          const elementConfig = getFormElementConfig(
            context.config,
            formElement.type
          );
          const data = formData[formElement.id].data;
          const result = elementConfig.parseConfigData(data);
          if (!result.success) {
            return;
          }
          const updatedForm = updateElement(initialForm, {
            ...formElement,
            data: result.data,
          });
          onChange(updatedForm);
        })}
      >
        <input className="usa-button" type="submit" value="Save" />
        <SelectedEditComponent
          context={context}
          form={initialForm}
          element={formElement}
        />
      </form>
    </FormProvider>
  );
};
