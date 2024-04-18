import classNames from 'classnames';
import React from 'react';
import Radio from './Radio';

export default function RadioGroup({ radios }) {
    console.log(radios);
    if (radios.length === 0) {
        return <p>empty</p>;
    }

    return (
          <div className="usa-radio">
            {radios.map(radio => (
                console.log(radio),
                <Radio radio={radio} />
            ))}
          </div>
    )
}