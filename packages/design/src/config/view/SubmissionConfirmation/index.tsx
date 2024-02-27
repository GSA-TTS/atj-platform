import React from 'react';

import { Pattern, type SubmissionConfirmationPattern } from '@atj/forms';
import { FormElementComponent } from '../../../Form';

const SubmissionConfirmation: FormElementComponent<
  Pattern<SubmissionConfirmationPattern>
> = ({ pattern }) => {
  return (
    <>
      <legend className="usa-legend usa-legend--large">
        Submission confirmation
      </legend>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {pattern.table.map((row, index) => {
            return (
              <tr key={index}>
                <td>{row.label}</td>
                <td>{row.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SubmissionConfirmation;
