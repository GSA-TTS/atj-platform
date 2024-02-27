import React from 'react';

import { Pattern, type FormSummaryPattern } from '@atj/forms';
import { type FormElementComponent } from '../../../Form';

const FormSummary: FormElementComponent<Pattern<FormSummaryPattern>> = ({
  pattern,
}) => {
  return (
    <>
      <legend className="usa-legend usa-legend--large">{pattern.title}</legend>
      <p>{pattern.description}</p>
    </>
  );
};
export default FormSummary;
