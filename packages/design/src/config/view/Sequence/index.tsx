import React from 'react';

import { type PatternProps } from '@atj/forms';
import { SequenceElement } from '@atj/forms/src/config/elements/sequence';

import { PatternComponent } from '../../../Form';

const Sequence: PatternComponent<PatternProps<SequenceElement>> = ({
  children,
}) => {
  return <>{children}</>;
};

export default Sequence;
