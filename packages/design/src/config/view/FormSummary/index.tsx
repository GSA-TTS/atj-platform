import React from 'react';

import { Pattern, type FormSummaryPattern } from '@atj/forms';
import { type FormElementComponent } from '../../../Form';

const FormSummary: FormElementComponent<Pattern<FormSummaryPattern>> = ({
  prompt,
}) => {
  return (
    <>
    <div className="usa-legend-wrapper">
      <legend className="usa-legend">{prompt.title}</legend>
      {prompt.description !== "" && (
      <p>{prompt.description}</p>   
      )}  
    </div>
    </>
  );
};
export default FormSummary;
