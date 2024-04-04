import React from 'react';

import { type FieldsetProps } from '@atj/forms';

import { type PatternComponent } from '../../../Form';

const FormSummary: PatternComponent<FieldsetProps> = props => {
  return (
    <fieldset className="usa-fieldset margin-top-4">
      <legend className="usa-legend">{props.legend}</legend>
      {props.children}
    </fieldset>
  );
};
export default FormSummary;
