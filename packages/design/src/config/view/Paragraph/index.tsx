import React from 'react';

import { type ParagraphPattern, type Pattern } from '@atj/forms';

import { type FormElementComponent } from '../../../Form';

const FormSummary: FormElementComponent<Pattern<ParagraphPattern>> = ({
  pattern,
}) => {
  if (pattern.style === 'heading') {
    return (
      <>
        <h2>{pattern.text}</h2>
      </>
    );
  } else if (pattern.style === 'subheading') {
    return (
      <>
        <h3>{pattern.text}</h3>
      </>
    );
  } else if (pattern.style === 'indent') {
    return (
      <>
        <ul className="usa-list">
          <li>{pattern.text}</li>
        </ul>
      </>
    );
  } else {
    return (
      <>
        <p>{pattern.text}</p>
      </>
    );
  }
};
export default FormSummary;
