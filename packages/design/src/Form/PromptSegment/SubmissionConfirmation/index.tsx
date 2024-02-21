import React from 'react';

import { type SubmissionConfirmationPrompt } from '@atj/forms';

export type SubmissionConfirmationProps = {
  prompt: SubmissionConfirmationPrompt;
};

export default function SubmissionConfirmation({
  prompt,
}: SubmissionConfirmationProps) {
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
          {prompt.table.map((row, index) => {
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
}
