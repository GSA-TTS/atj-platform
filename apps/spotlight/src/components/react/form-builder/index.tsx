import React from 'react';

import { SuggestedForm } from '@atj/documents/src/suggestions';

export const FormBuilder = ({ fields }: { fields: SuggestedForm }) => {
  return (
    <div>
      {fields.map((field, index) => {
        return <FieldBuilder key={index} field={field} />;
      })}
    </div>
  );
};

const FieldBuilder = ({ field }: { field: SuggestedForm[number] }) => {
  const fieldId = `field-${field.id}`;
  return (
    <div className="grid-row grid-gap">
      <div className="grid-col">
        <label className="usa-label">
          Input type
          <select className="usa-select" name={`input-type-${fieldId}`}>
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
            type="text"
            name={`description-${fieldId}`}
            defaultValue={field.label}
          ></input>
        </label>
      </div>
      <div className="grid-col">
        <label className="usa-label">
          Default value
          <input
            className="usa-input"
            type="text"
            name={`default-value-${fieldId}`}
            defaultValue={field.value}
          ></input>
        </label>
      </div>
    </div>
  );
};
