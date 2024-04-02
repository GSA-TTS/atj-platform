import React from 'react';

import { type ParagraphPattern, type Pattern } from '@atj/forms';

import { type FormElementComponent } from '../../../Form';

const FormSummary: FormElementComponent<Pattern<ParagraphPattern>> = ({
  pattern,
}) => {
  if (pattern.style === 'heading') {
    return (
      <>
        <h2 
          contentEditable={false} 
          suppressContentEditableWarning={true}
        >{pattern.text}</h2>
      </>
    );
  } else if (pattern.style === 'subheading') {
    return (
      <>
        <h3 
          contentEditable={false} 
          suppressContentEditableWarning={true}
        >{pattern.text}</h3>
      </>
    );
  } else if (pattern.style === 'indent') {
    return (
      <>
        <ul 
          className="usa-list" 
          contentEditable={false} 
          suppressContentEditableWarning={true}
        >
          <li>{pattern.text}</li>
        </ul>
      </>
    );
  } else {
    return (
      <>
        <p 
          contentEditable={false} 
          suppressContentEditableWarning={true}
        >{pattern.text}</p>
      </>
    );
  }
};
export default FormSummary;
