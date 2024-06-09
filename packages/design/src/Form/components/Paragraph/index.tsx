import React from 'react';

import { type ParagraphProps } from '@atj/forms';

import { type PatternComponent } from '../../../Form';

const styleMap: { [key: string]: { tag: string; className: string } } = {
  normal: { tag: 'p', className: 'usa-prose' },
  heading: { tag: 'h1', className: 'usa-heading' },
  subheading: { tag: 'h2', className: 'usa-heading usa-heading--sub' },
};

const Paragraph: PatternComponent<ParagraphProps> = props => {
  const { tag, className } = styleMap[props.style] || styleMap.normal;

  return React.createElement(tag, { className }, props.text);
};

export default Paragraph;