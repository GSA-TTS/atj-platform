import React from 'react';

import { type FieldsetPattern, type PatternProps } from '@atj/forms';

import { type PatternComponent } from '../../../Form';

const FormSummary: PatternComponent<PatternProps<FieldsetPattern>> = ({
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
