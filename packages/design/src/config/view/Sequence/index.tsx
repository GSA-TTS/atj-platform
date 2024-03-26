import React from 'react';

import { type PatternProps } from '@atj/forms';
import { SequenceElement } from '@atj/forms/src/config/elements/sequence';

import { FormElementComponent } from '../../../Form';

const Sequence: FormElementComponent<PatternProps<SequenceElement>> = ({
  children,
}) => {
  return <>{children}</>;
};

export default Sequence;
