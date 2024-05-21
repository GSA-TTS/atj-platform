import React, { type ReactElement } from 'react';

export type RadioGroupProps = {
  legend: string;
  children: ReactElement<RadioProps> | ReactElement<RadioProps>[];
};

export default function RadioGroup({ legend, children }: RadioGroupProps) {
  return (
    <div className="usa-fieldset">
      <legend className="usa-legend">{legend}</legend>
      {children}
    </div>
  );
}

export type RadioProps = {
  id: string;
  name: string;
  label: string;
  disabled?: boolean;
  defaultChecked: boolean;
};

export const RadioInput = (props: RadioProps) => {
  return (
    <div className="usa-radio">
      <input
        id={props.id}
        name={props.name}
        className="usa-radio__input"
        type="radio"
        disabled={props.disabled}
        defaultChecked={props.defaultChecked}
      />
      <label htmlFor={props.id} className="usa-radio__label">
        {props.label}
      </label>
    </div>
  );
};
