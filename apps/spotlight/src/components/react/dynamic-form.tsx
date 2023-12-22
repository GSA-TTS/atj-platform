import React from 'react';

// Assuming this is the structure of your JSON data
interface Field {
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

// Capitalization function
function capitalizeFirstLetter(string) {
  return string
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

interface FormProps {
  fields: Field[];
}

const DynamicFormFieldset = ({ fields }: FormProps) => {
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

// Define components for each field type
const TextField = ({ field }: { field: Field }) => {
  return (
    <div className="usa-form-group">
      <label className="usa-label" htmlFor={field.name}>
        {capitalizeFirstLetter(field.label)}
        {field.required && (
          <abbr title="required" className="usa-hint usa-hint--required">
            {' '}
            *
          </abbr>
        )}
      </label>
      <input
        className={`usa-input ${field.class}`}
        name={field.name}
        type="text"
        defaultValue={field.value}
      />
    </div>
  );
};

const BooleanField = ({ field }: { field: Field }) => {
  return (
    <div className="usa-checkbox">
      <input
        className="usa-checkbox__input"
        id={field.name}
        name={field.name}
        type="checkbox"
        defaultChecked={field.value === 'true'}
      />
      <label className="usa-label usa-checkbox__label" htmlFor={field.name}>
        {field.label}
        {field.required && (
          <abbr title="required" className="usa-hint usa-hint--required">
            {' '}
            *
          </abbr>
        )}
      </label>
    </div>
  );
};

const CheckBoxField = ({ field }: { field: Field }) => {
  return (
    <div className="usa-checkbox">
      <input
        className="usa-checkbox__input"
        id={field.name}
        name={field.name}
        type="checkbox"
        defaultChecked={field.value === 'false'}
      />
      <label className="usa-label usa-checkbox__label" htmlFor={field.name}>
        {field.label}
        {field.required && (
          <abbr title="required" className="usa-hint usa-hint--required">
            {' '}
            *
          </abbr>
        )}
      </label>
    </div>
  );
};

const SelectField = ({ field }: { field: Field }) => {
  return (
    <div className="usa-form-group">
      <label className="usa-label" htmlFor={field.name}>
        {field.label}
      </label>
      <select className="usa-select" name={field.name} id={field.id}>
        {field.options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const RadioField = ({ field }: { field: Field }) => {
  return (
    <fieldset className="usa-fieldset">
      <legend className="usa-legend">{field.label}</legend>
      {field.options?.map((option, index) => (
        <div key={index} className="usa-radio">
          <input
            className="usa-radio__input"
            type="radio"
            name={field.name}
            id={`${field.id}-${index}`}
            value={option.value}
          />
          <label className="usa-radio__label" htmlFor={`${field.id}-${index}`}>
            {option.name}
          </label>
        </div>
      ))}
    </fieldset>
  );
};

const TextareaField = ({ field }: { field: Field }) => {
  return (
    <div className="usa-form-group">
      <label className="usa-label" htmlFor={field.name}>
        {field.label}
      </label>
      <textarea
        className="usa-textarea"
        name={field.name}
        id={field.id}
      ></textarea>
    </div>
  );
};

const Header2Block = ({ field }: { field: Field }) => {
  return <h2>{field.label}</h2>;
};

const Header3Block = ({ field }: { field: Field }) => {
  return <h3>{field.label}</h3>;
};

const ParagraphBlock = ({ field }: { field: Field }) => {
  return (
    <p>
      {field.label}{' '}
      <a href={field.linkurl} target="_blank">
        {field.linkurl}
      </a>
    </p>
  );
};

const DateField = ({ field }: { field: Field }) => {
  return (
    <div className="usa-form-group">
      <label
        className="usa-label"
        id={field.arialabelledby}
        htmlFor={field.name}
      >
        {field.label}
      </label>
      <div className="usa-date-picker">
        <input
          className="usa-input"
          id={field.id}
          name={field.name}
          aria-labelledby={field.arialabelledby}
          aria-describedby={field.ariadescribedby}
        />
      </div>
    </div>
  );
};

const UnorderedList = ({ field }: { field: Field }) => {
  return (
    <ul>
      {field.items?.map((item, index) => <li key={index}>{item.content}</li>)}
    </ul>
  );
};

export default DynamicFormFieldset;
