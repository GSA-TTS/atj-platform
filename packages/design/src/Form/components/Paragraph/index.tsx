import React from 'react';

import { type RichTextProps } from '@atj/forms';

import { type PatternComponent } from '../../../Form';

const FormSummary: PatternComponent<RichTextProps> = props => {
  return (
    <>
      <p className="maxw-tablet">{props.text}</p>
    </>
  );
};
export default FormSummary;
