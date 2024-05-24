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
      <label className="usa-checkbox__label">
        {props.label}
        <input
          id={props.id}
          name={props.name}
          type="checkbox"
          className="usa-checkbox__input"
          defaultChecked={props.defaultChecked}
        />
      </label>
    </div>
  );
}
