import React from 'react';

import { type FormSummaryProps } from '@atj/forms';
import { type PatternComponent } from '../../../Form';

const FormSummary: PatternComponent<FormSummaryProps> = ({ pattern }) => {
  return (
    <>
      <div className="usa-legend-wrapper">
        {/* <legend className="usa-legend">{pattern.title}</legend> */}
        <h1>{pattern.title}</h1>
        {pattern.description !== '' && <p>{pattern.description}</p>}
      </div>
    </>
  );
};
export default FormSummary;
