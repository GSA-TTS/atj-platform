import React from 'react';

import { type FieldsetProps } from '@atj/forms';

import { type PatternComponent } from '../../../Form';

const Fieldset: PatternComponent<FieldsetProps> = props => {
  return (
    <fieldset className="usa-fieldset margin-top-4">
      {props.legend !== '' && props.legend !== undefined && (
        <legend className="usa-legend margin-top-2 margin-bottom-1">{props.legend}</legend>
      )}

      {props.subheader !== '' && props.subheader !== undefined && (
        <h3 className="section-heading-h3 margin-top-2 margin-bottom-1">{props.subheader}</h3>
      )}

      {props.children}     
    </fieldset>
  );
};
export default Fieldset;
