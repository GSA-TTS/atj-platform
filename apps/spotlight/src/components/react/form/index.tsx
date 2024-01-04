import React from 'react';
import {
  TextField,
  BooleanField,
  CheckBoxField,
  SelectField,
  RadioField,
  DateField,
  TextareaField,
  ParagraphBlock,
  Header3Block,
  UnorderedList,
} from './fields';
import { getFormFromStorage } from '../../../lib/form-repo';

// Assuming this is the structure of your JSON data
export interface Field {
  tag: string;
  type: string;
  name: string;
  id: string;
  class: string;
  value?: string;
  label: string;
  title?: string;
  required?: boolean;
  options?: { name: string; value: string }[]; // For select and radio fields
  items?: { tag: string; content: string }[];
  arialabelledby?: string;
  ariadescribedby?: string;
  linkurl?: string;
}

export const ClientLoadedForm = ({ id }: { id: string }) => {
  // Fallback to hardcoded data if a magic ID is chosen.
  const fields = getFormFromStorage(window.localStorage, id);
  return <FormFieldset fields={fields} />;
};

export const FormFieldset = ({ fields }: { fields: Field[] }) => {
  return (
    <fieldset className="usa-fieldset">
      <legend className="usa-legend usa-legend--large">
        UD 105 - Unlawful Detainer Form
      </legend>
      {fields.map(field => {
        // Use 'tag' for 'select' and 'textarea', 'type' for others
        const fieldType =
          field.tag === 'select' ||
          field.tag === 'textarea' ||
          field.tag === 'p' ||
          field.tag === 'h2' ||
          field.tag === 'h3' ||
          field.tag === 'ul'
            ? field.tag
            : field.type;

        switch (fieldType) {
          case 'text':
            return <TextField key={field.id} field={field} />;
          case 'boolean':
            return <BooleanField key={field.id} field={field} />;
          case 'checkbox':
            return <CheckBoxField key={field.id} field={field} />;
          case 'select':
            return <SelectField key={field.id} field={field} />;
          case 'radio':
            return <RadioField key={field.id} field={field} />;
          case 'date':
            return <DateField key={field.id} field={field} />;
          case 'textarea':
            return <TextareaField key={field.id} field={field} />;
          case 'p':
            return <ParagraphBlock key={field.id} field={field} />;
          case 'h2':
            return <Header3Block key={field.id} field={field} />;
          case 'h3':
            return <Header3Block key={field.id} field={field} />;
          case 'ul':
            return <UnorderedList key={field.id} field={field} />;
          default:
            return null;
        }
      })}
      {/* Add submit button or other controls as needed */}
    </fieldset>
  );
};
