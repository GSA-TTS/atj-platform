import React from 'react';

export default function Radio({ radio: { 
    id,
    label,
    disabled
} }) {
    
    return (
          <div className="usa-radio">
            <input
              key={id}
              id={id}
              className="usa-radio__input"
              type="radio"
              disabled={disabled}
            />
            <label 
              htmlFor={id}
              className="usa-radio__label"
            >
              {label}
            </label>
          </div>
    )
}