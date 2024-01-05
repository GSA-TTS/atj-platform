import React from 'react';

import { Field } from '.';

export const TextField = ({ field }: { field: Field }) => {
  return (
    <div className="usa-form-group">
      <label className="usa-label" htmlFor={field.name}>
        {field.label}
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

export const BooleanField = ({ field }: { field: Field }) => {
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

export const CheckBoxField = ({ field }: { field: Field }) => {
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

export const SelectField = ({ field }: { field: Field }) => {
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

export const RadioField = ({ field }: { field: Field }) => {
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

export const TextareaField = ({ field }: { field: Field }) => {
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

export const Header2Block = ({ field }: { field: Field }) => {
  return <h2>{field.label}</h2>;
};

export const Header3Block = ({ field }: { field: Field }) => {
  return <h3>{field.label}</h3>;
};

export const ParagraphBlock = ({ field }: { field: Field }) => {
  return (
    <p>
      {field.label}{' '}
      <a href={field.linkurl} target="_blank">
        {field.linkurl}
      </a>
    </p>
  );
};

export const DateField = ({ field }: { field: Field }) => {
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

export const UnorderedList = ({ field }: { field: Field }) => {
  return (
    <ul>
      {field.items?.map((item, index) => <li key={index}>{item.content}</li>)}
    </ul>
  );
};
