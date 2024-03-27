import React from 'react';

import { type FieldsetProps } from '@atj/forms';

import { type PatternComponent } from '../../../Form';

const FormSummary: PatternComponent<FieldsetProps> = ({
  pattern,
  children,
}) => {
  return (
    <fieldset className="usa-fieldset margin-top-4">
      <legend className="usa-legend">{pattern.legend}</legend>
      {children}
    </fieldset>
  );
};
export default FormSummary;
