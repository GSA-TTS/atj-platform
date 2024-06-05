import React, { type ReactElement } from 'react';

export type RadioGroupProps = {
  legend: string;
  children: ReactElement<RadioProps> | ReactElement<RadioProps>[];
};

export default function RadioGroup({ legend, children }: RadioGroupProps) {
  return (
    <div className="usa-fieldset">
      <legend className="usa-legend text-bold">{legend}</legend>
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
      <input className="usa-radio__input" type="radio" {...props} />
      <label htmlFor={props.id} className="usa-radio__label">
        {props.label}
      </label>
    </div>
  );
};
