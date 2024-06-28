import React from 'react';

import { type FieldsetProps } from '@atj/forms';

import { type PatternComponent } from '../../../Form';

const Fieldset: PatternComponent<FieldsetProps> = props => {
  return (
    <fieldset className="usa-fieldset width-full padding-top-2">
      {props.legend !== '' && props.legend !== undefined && (
        <legend className="usa-legend text-bold text-uppercase line-height-body-4 width-full margin-top-0 padding-top-3 padding-bottom-1">
          {props.legend}
        </legend>
      )}

      {props.children}
    </fieldset>
  );
};
export default Fieldset;
