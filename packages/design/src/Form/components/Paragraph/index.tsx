import React from 'react';
import { type ParagraphProps } from '@atj/forms';

import { type PatternComponent } from '../../../Form';

const Paragraph: PatternComponent<ParagraphProps> = props => {
  const fontTag = props.fontTag || 'p';
  const fontModifiers = props.fontModifiers || [];

  const classMap: { [key: string]: string } = {
    'bold': 'text-bold',
    'italic': 'text-italic',
    'small': 'font-body-sm',
  };

  const classNames = fontModifiers.map(modifier => classMap[modifier] || '').join(' ');

  return React.createElement(fontTag, {className: classNames}, props.text);
};
export default Paragraph;
