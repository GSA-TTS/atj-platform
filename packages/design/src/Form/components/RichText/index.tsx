import React from 'react';

import { type RichTextProps } from '@atj/forms';
import { en as message } from '@atj/common/src/locales/en/app';
import { type PatternComponent } from '../../../Form';

const FormSummary: PatternComponent<RichTextProps> = props => {
  return (
    <>
      <p>{message.patterns.richText.displayName}</p>
      <div dangerouslySetInnerHTML={{ __html: props.text }} />
    </>
  );
};
export default FormSummary;
