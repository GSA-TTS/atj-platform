import React from 'react';
import { useFormContext } from 'react-hook-form';

import { FormDefinition, FormElement } from '@atj/forms';
import { SequenceElementEdit } from './SequenceElementEdit';

export default function RenderField({
  form,
  element,
}: {
  form: FormDefinition;
  element: FormElement;
}) {
  const { register } = useFormContext();
  const fieldId = element.id;
  if (element.type === 'input') {
    return (
      <div className="grid-row grid-gap">
        <div className="grid-col grid-col-4">
          <label className="usa-label">
            Field label
            <input
              className="usa-input"
              {...register(`${fieldId}.text`)}
              type="text"
            ></input>
          </label>
        </div>
        <div className="grid-col grid-col-4">
          <label className="usa-label">
            Default field value
            <input
              className="usa-input"
              type="text"
              {...register(`${fieldId}.initial`)}
            ></input>
          </label>
        </div>
        <div className="grid-col grid-col-2">
          <label className="usa-label">
            Field type
            <select className="usa-select" {...register(`${fieldId}.type`)}>
              <option value={'input'}>Input</option>
              <option value={'textarea'}>Textarea</option>
            </select>
          </label>
        </div>
        <div className="grid-col grid-col-2">
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
        <SequenceElementEdit element={element} form={form} />
      </fieldset>
    );
  } else {
    const _exhaustiveCheck: never = element;
    return _exhaustiveCheck;
  }
}
