import React from 'react';

type CheckboxProps = {
  id: string;
  name: string;
  label: string;
  defaultChecked: boolean;
};

export default function Checkbox(props: CheckboxProps) {
  return (
    <div className="usa-checkbox">
      <input type="checkbox" className="usa-checkbox__input" {...props} />
      <label className="usa-checkbox__label" htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
}
