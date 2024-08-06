import React from 'react';
import DOMPurify from 'dompurify';

import { type ParagraphProps } from '@atj/forms';

import { type PatternComponent } from '../../../Form';

const FormSummary: PatternComponent<ParagraphProps> = props => {
  const clean = DOMPurify.sanitize(props.text, {
    USE_PROFILES: { html: true },
  });
  return (
    <>
      <div
        className="maxw-tablet"
        dangerouslySetInnerHTML={{ __html: clean }}
      ></div>
    </>
  );
};
export default FormSummary;
