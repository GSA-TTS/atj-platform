import React from 'react';

import { type FormSummaryProps } from '@atj/forms';
import { type PatternComponent } from '../../../Form';

const FormSummary: PatternComponent<FormSummaryProps> = ({ pattern }) => {
  return (
    <>
      <div className="usa-legend-wrapper">
        {/* <legend className="usa-legend">{pattern.title}</legend> */}
        <h1>{pattern.title}</h1>
        {pattern.summary !== '' && <p>{pattern.summary}</p>}
      </div>
    </>
  );
};
export default FormSummary;
