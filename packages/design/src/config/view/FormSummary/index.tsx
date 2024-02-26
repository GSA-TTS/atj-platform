import React from 'react';

import { Pattern, type FormSummaryPattern } from '@atj/forms';
import { type FormElementComponent } from '../../../Form';

const FormSummary: FormElementComponent<Pattern<FormSummaryPattern>> = ({
  prompt,
}) => {
  return (
    <>
      <legend className="usa-legend usa-legend--large">{prompt.title}</legend>
      <p>{prompt.description}</p>
    </>
  );
};
export default FormSummary;
