import React from 'react';

type CheckboxProps = {
  id: string;
  name: string;
  label: string;
};

export default function Checkbox(props: CheckboxProps) {
  return (
    <div className="usa-checkbox">
      <input
        id={props.id}
        name={props.name}
        type="checkbox"
        className="usa-checkbox__input"
      />
      <label className="usa-checkbox__label" htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
}
