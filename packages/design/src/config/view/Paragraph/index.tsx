import React from 'react';

import { type ParagraphProps } from '@atj/forms';

import { type PatternComponent } from '../../../Form';

const FormSummary: PatternComponent<ParagraphProps> = props => {
  return (
    <>
      <p>{props.text}</p>
    </>
  );
};
export default FormSummary;
