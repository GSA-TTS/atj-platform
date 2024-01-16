import React from 'react';

import { FormSummaryPrompt } from '@atj/forms';

export const FormSummary = ({ prompt }: { prompt: FormSummaryPrompt }) => {
  return (
    <legend className="usa-legend usa-legend--large">
      {prompt.title} - {prompt.description}
    </legend>
  );
};
