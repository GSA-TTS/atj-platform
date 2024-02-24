import React from 'react';

import { type FormSummaryPrompt } from '@atj/forms';
import { FormElementComponent } from '../../../Form';

const FormSummary: FormElementComponent<FormSummaryPrompt> = ({ prompt }) => {
  return (
    <>
      <legend className="usa-legend usa-legend--large">{prompt.title}</legend>
      <p>{prompt.description}</p>
    </>
  );
};
export default FormSummary;
