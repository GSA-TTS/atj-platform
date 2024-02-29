import React from 'react';

import { type FieldsetPattern, type Pattern } from '@atj/forms';

import { type FormElementComponent } from '../../../Form';

const FormSummary: FormElementComponent<Pattern<FieldsetPattern>> = ({
  pattern,
  children,
}) => {
  return (
    <fieldset className="usa-fieldset">
      <legend className="usa-legend">{pattern.legend}</legend>
      {children}
    </fieldset>
  );
};
export default FormSummary;
