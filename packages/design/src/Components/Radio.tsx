import classNames from 'classnames';
import React from 'react';

export default function Radio({ props: { 
    id,
    label,
    secondary,
    uswds
} }) {
    
    return (
          <div className="usa-radio">
            <input
              key={id}
              className="usa-radio__input"
              type="radio"
            />
            <label 
              className="usa-radio__label" 
            >
              {label}
            </label>
          </div>
    )
}