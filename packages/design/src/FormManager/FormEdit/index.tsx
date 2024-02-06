import React from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { type FormService } from '@atj/form-service';
import {
  type FormDefinition,
  type FormElementMap,
  type FormElement,
  getRootFormElement,
  updateElements,
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
}: {
  form: FormDefinition;
  onSave: (form: FormDefinition) => void;
}) => {
  const formElements: FormElementMap = getFormFieldMap(form.elements);
  const { register, handleSubmit } = useForm<FormElementMap>({
    defaultValues: formElements,
  });
  const rootField = getRootFormElement(form);
  return (
    <form
      onSubmit={handleSubmit(data => {
        const updatedForm = updateElements(form, data);
        onSave(updatedForm);
      })}
    >
      <ButtonBar />
      <RenderField form={form} element={rootField} register={register} />
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

const RenderField = ({
  form,
  element,
  register,
}: {
  form: FormDefinition;
  element: FormElement;
  register: UseFormRegister<FormElementMap>;
}) => {
  const fieldId = element.id;
  if (element.type === 'input') {
    return (
      <div className="grid-row grid-gap">
        <div className="grid-col">
          <label className="usa-label">
            Input type
            <select className="usa-select" {...register(`${fieldId}.type`)}>
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
              {...register(`${fieldId}.text`)}
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
  } else if (element.type == 'sequence') {
    return (
      <fieldset>
        {element.elements.map((elementId, index) => {
          const sequenceElement = form.elements[elementId];
          return (
            <RenderField
              key={index}
              element={sequenceElement}
              form={form}
              register={register}
            />
          );
        })}
      </fieldset>
    );
  } else {
    const _exhaustiveCheck: never = element;
    return _exhaustiveCheck;
  }
};
