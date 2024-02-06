import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { type FormService } from '@atj/form-service';
import {
  type FormDefinition,
  getFlatFieldList,
  replaceFormElements,
  FormElementMap,
} from '@atj/forms';

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
        form={form}
        onSave={form => formService.saveForm(formId, form)}
      />
    </div>
  );
}

type FieldProps = {
  fieldType: 'input' | 'textarea';
  label: string;
  initial: string;
  required: boolean;
};
type FieldMap = Record<string, FieldProps>;

const getFormFieldMap = (elements: FormElementMap) => {
  return Object.values(elements).reduce((acc, element) => {
    if (element.type === 'input') {
      acc[element.id] = {
        fieldType: 'input',
        label: element.text,
        initial: element.initial.toString(),
        required: element.required,
      };
      return acc;
    } else if (element.type === 'sequence') {
      return acc;
    } else {
      const _exhaustiveCheck: never = element;
      return _exhaustiveCheck;
    }
  }, {} as FieldMap);
};

const EditForm = ({
  form,
  onSave,
}: {
  form: FormDefinition;
  onSave: (form: FormDefinition) => void;
}) => {
  const formData: FieldMap = getFormFieldMap(form.elements);
  const { register, handleSubmit } = useForm<FieldMap>({
    defaultValues: formData,
  });
  const fields = getFlatFieldList(form);
  return (
    <form
      onSubmit={handleSubmit(data => {
        const updatedForm = replaceFormElements(
          form,
          Object.entries(data).map(([id, field]) => {
            return {
              type: 'input',
              id,
              text: field.label,
              initial: field.initial,
              required: field.required,
            };
          })
        );
        onSave(updatedForm);
      })}
    >
      <ButtonBar />
      <fieldset>
        {fields.map((field, index) => {
          const fieldId = field.id;
          return (
            <div key={index} className="grid-row grid-gap">
              <div className="grid-col">
                <label className="usa-label">
                  Input type
                  <select
                    className="usa-select"
                    {...register(`${fieldId}.fieldType`)}
                  >
                    <option value={'input'}>Input</option>
                    <option value={'textarea'}>Textarea</option>
                  </select>
                </label>
              </div>
              <div className="grid-col">
                <label className="usa-label">
                  Field label
                  <input
                    className="usa-input"
                    {...register(`${fieldId}.label`)}
                    type="text"
                  ></input>
                </label>
              </div>
              <div className="grid-col">
                <label className="usa-label">
                  Default value
                  <input
                    className="usa-input"
                    type="text"
                    {...register(`${fieldId}.initial`)}
                  ></input>
                </label>
              </div>
              <div className="grid-col">
                <div className="usa-checkbox">
                  <input
                    className="usa-checkbox__input"
                    type="checkbox"
                    id={`${fieldId}.required`}
                    {...register(`${fieldId}.required`)}
                  />
                  <label
                    className="usa-checkbox__label"
                    htmlFor={`${fieldId}.required`}
                  >
                    Required
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </fieldset>
      <ButtonBar />
    </form>
  );
};

const ButtonBar = () => {
  return (
    <div>
      <button className="usa-button">Save</button>
    </div>
  );
};
