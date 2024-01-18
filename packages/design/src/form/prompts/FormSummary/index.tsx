import React from 'react';

import { FormSummaryPrompt } from '@atj/forms';

export type TextSummaryProps = { prompt: FormSummaryPrompt };

export default function FormSummary({ prompt }: TextSummaryProps) {
  return (
    <>
      <legend className="usa-legend usa-legend--large">{prompt.title}</legend>
      <p>{prompt.description}</p>
    </>
  );
}
