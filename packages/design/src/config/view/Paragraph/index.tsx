import React from 'react';

import { type Pattern } from '@atj/forms';
import { type ParagraphElement } from '@atj/forms/src/config/elements/paragraph';

import { type FormElementComponent } from '../../../Form';

const FormSummary: FormElementComponent<Pattern<ParagraphElement>> = ({
  pattern,
}) => {
  return (
    <>
      <p>{pattern.data.text}</p>
    </>
  );
};
export default FormSummary;
