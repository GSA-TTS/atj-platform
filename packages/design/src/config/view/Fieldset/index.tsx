import React from 'react';

import { type FieldsetProps } from '@atj/forms';

import { type PatternComponent } from '../../../Form';

const FormSummary: PatternComponent<FieldsetProps> = ({
  pattern,
  children,
}) => {
  const isEditable = () => {
    // TODO: return true if we're in edit mode, false if display mode
    return true
  }
  const handleBlur = () => {
    if (!isEditable()) return;
    // TODO: use forms service here to update element, is pattern._elementID all we need?
  };
  return (
    <fieldset className="usa-fieldset margin-top-4">
      <legend 
        className="usa-legend" 
        contentEditable={isEditable()}
        onBlur={handleBlur}
      >{pattern.legend}</legend>
      {children}
    </fieldset>
  );
};
export default FormSummary;
