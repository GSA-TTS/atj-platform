import React from 'react';

import { type Pattern } from '@atj/forms';
import { SequenceElement } from '@atj/forms/src/config/elements/sequence';

import { FormElementComponent } from '../../../Form';

const Sequence: FormElementComponent<Pattern<SequenceElement>> = ({
  children,
}) => {
  return <>{children}</>;
};

export default Sequence;
