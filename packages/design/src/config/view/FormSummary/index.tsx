import React from 'react';

import { type FormSummaryProps } from '@atj/forms';
import { type PatternComponent } from '../../../Form';

const FormSummary: PatternComponent<FormSummaryProps> = props => {
  return (
    <>
      <div className="usa-legend-wrapper">
        {/* <legend className="usa-legend">{pattern.title}</legend> */}
        <h1>{props.title}</h1>
        {props.description !== '' && <p>{props.description}</p>}
      </div>
    </>
  );
};
export default FormSummary;
