import React from 'react';

import { SuggestedForm } from '@atj/documents/src/suggestions';

export const FormBuilder = ({ fields }: { fields: SuggestedForm }) => {
  return fields.map((field, index) => {
    return <FieldBuilder key={index} field={field} />;
  });
};

const FieldBuilder = ({ field }: { field: SuggestedForm[number] }) => {
  const fieldId = `field-${field.id}`;
  return (
    <fieldset>
      <div>
        PDF field id: {field.id}, name: {field.name}
      </div>
      <select className="usa-select" name={fieldId}>
        <option value={'input'}>Input</option>
        <option value={'textarea'}>Textarea</option>
      </select>
      <label className="usa-label">
        <input
          className="usa-input"
          type="text"
          name={`input-type-${fieldId}`}
          defaultValue={field.value}
        ></input>
      </label>
      <label className="usa-label">
        Field label
        <input
          className="usa-input"
          type="text"
          name={`description-${fieldId}`}
          defaultValue={field.label}
        ></input>
      </label>
      <label className="usa-label">
        Default value
        <input
          className="usa-input"
          type="text"
          name={`default-value-${fieldId}`}
          defaultValue={field.value}
        ></input>
      </label>
    </fieldset>
  );
};
