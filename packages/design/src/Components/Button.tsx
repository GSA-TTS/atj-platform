import classNames from 'classnames';
import React from 'react';

export default function Button({ props: { 
    id,
    label,
    disabled,
    secondary,
    textOnly,
    uswds
} }) {
    
    return (
            <button key={id} type="button" 
                className={classNames('usa-button', {
                    'usa-button--outline': secondary,
                    'usa-button--unstyled': textOnly,
                  })}
            >
            {label}
            </button>
    )
}
