import classNames from 'classnames';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function Checkbox({ props: { 
    id,
    label,
    secondary,
    uswds
} }) {
    const { register } = useFormContext();
    return (

          <div className="usa-checkbox">
            <input
              key={id}
              id={id}
              type="checkbox"
              className={classNames('usa-checkbox__input', )}
 
            />
            <label
              className="usa-checkbox__label"
              for={id}
            >
              {label}
            </label>
          </div>
    )
}
