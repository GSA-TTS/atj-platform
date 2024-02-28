import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  getFormElementConfig,
  updateElement,
  type FormElementMap,
} from '@atj/forms';
import { FormEditUIContext } from '../../config';
import { usePreviewContext } from './context';

export const FormElementEdit = ({
  context,
}: {
  context: FormEditUIContext;
}) => {
  const { form, selectedElement, setCurrentForm } = usePreviewContext();
  if (!selectedElement) {
    return;
  }

  const methods = useForm<FormElementMap>({
    defaultValues: {
      [selectedElement.id]: selectedElement,
    },
  });
  useEffect(() => {
    methods.setValue(selectedElement.id, selectedElement);
  }, [selectedElement]);

  const SelectedEditComponent = context.editComponents[selectedElement.type];
  return (
    <FormProvider {...methods}>
      <div className="settingsContainer">
        <h2>Editing {selectedElement.id}...</h2>
        <form
          className="editForm"
          onSubmit={methods.handleSubmit(formData => {
            const elementConfig = getFormElementConfig(
              context.config,
              selectedElement.type
            );
            const data = formData[selectedElement.id].data;
            const result = elementConfig.parseConfigData(data);
            if (!result.success) {
              return;
            }
            const updatedForm = updateElement(form, {
              ...selectedElement,
              data: result.data,
            });
            setCurrentForm(updatedForm);
          })}
        >
          <SelectedEditComponent
            context={context}
            form={form}
            element={selectedElement}
          />
          <p>
            <input className="usa-button" type="submit" value="Save" />
          </p>
        </form>
      </div>
    </FormProvider>
  );
};
