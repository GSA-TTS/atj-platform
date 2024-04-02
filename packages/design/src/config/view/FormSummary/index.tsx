import React from 'react';

import { Pattern, type FormSummaryPattern } from '@atj/forms';
import { type FormElementComponent } from '../../../Form';

const FormSummary: FormElementComponent<Pattern<FormSummaryPattern>> = ({
  pattern,
}) => {
  return (
    <>
      <div className="usa-legend-wrapper">
        <h1>{pattern.title}</h1>
        {pattern.description !== '' && <p>{pattern.description}</p>}
      </div>
    </>
  );
};
export default FormSummary;
