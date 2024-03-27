import classNames from 'classnames';
import React from 'react';

export default function Checkbox({ props: { 
    id,
    label,
    secondary,
    uswds
} }) {
    
    return (

          <div className="usa-checkbox">
            <input
              key={id}
              type="checkbox"
              className={classNames('usa-checkbox__input', )}
            />
            <label
              className="usa-checkbox__label"
            >
              {label}
            </label>
          </div>
    )
}
