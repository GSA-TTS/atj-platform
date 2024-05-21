import React from 'react';

import { type FieldsetProps } from '@atj/forms';

import { type PatternComponent } from '../../../Form';

const Fieldset: PatternComponent<FieldsetProps> = props => {
  return (
    <fieldset className="usa-fieldset width-full margin-top-4">
      {props.legend !== '' && props.legend !== undefined && (
        <legend className="usa-legend font-body-5 text-uppercase line-height-body-4 margin-top-2 margin-bottom-1">
          {props.legend}
        </legend>
      )}

      {props.children}
    </fieldset>
  );
};
export default Fieldset;
