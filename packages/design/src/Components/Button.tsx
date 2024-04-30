import classNames from 'classnames';
import React from 'react';

export default function Button({ props: { id, label, secondary, textOnly } }) {
  return (
    <button
      key={id}
      type="button"
      className={classNames('usa-button', {
        'usa-button--outline': secondary,
        'usa-button--unstyled': textOnly,
      })}
    >
      {label}
    </button>
  );
}
