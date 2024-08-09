import React from 'react';

import { type RichTextProps } from '@atj/forms';

import { type PatternComponent } from '../../../Form';

const FormSummary: PatternComponent<RichTextProps> = props => {
  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: props.text }}
      />
    </>
  );
};
export default FormSummary;
