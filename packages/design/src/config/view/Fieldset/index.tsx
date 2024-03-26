import React from 'react';

import { type FieldsetPattern, type Pattern } from '@atj/forms';

import { type FormElementComponent } from '../../../Form';

const FormSummary: FormElementComponent<Pattern<FieldsetPattern>> = ({
  pattern,
  children,
}) => {
  const isEditable = () => {
    // TODO: return true if we're inside formEditor else false
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
