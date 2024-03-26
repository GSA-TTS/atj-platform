import React from 'react';

import { type PatternProps } from '@atj/forms';
import { type SequenceElement } from '@atj/forms/src/elements/sequence';

import { type PatternComponent } from '../../../Form';

const Sequence: PatternComponent<PatternProps<SequenceElement>> = ({
  children,
}) => {
  return <>{children}</>;
};

export default Sequence;
