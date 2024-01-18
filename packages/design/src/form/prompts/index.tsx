import React from 'react';

import { type PromptPart } from '@atj/forms';
import FormSummary from './FormSummary';
import TextInput from './TextInput';

export const PromptSegment = ({ promptPart }: { promptPart: PromptPart }) => {
  if (promptPart.type === 'form-summary') {
    return <FormSummary prompt={promptPart} />;
  } else if (promptPart.type === 'text') {
    return <TextInput prompt={promptPart} />;
  } else {
    const _exhaustiveCheck: never = promptPart;
    return <></>;
  }
};
