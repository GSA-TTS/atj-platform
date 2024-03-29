import React from 'react';

import { type ParagraphProps } from '@atj/forms';

import { type PatternComponent } from '../../../Form';

const FormSummary: PatternComponent<ParagraphProps> = ({ pattern }) => {
  return (
    <>
      <p>{pattern.text}</p>
    </>
  );
};
export default FormSummary;
