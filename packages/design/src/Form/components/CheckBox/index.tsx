import React from 'react';

import { type CheckboxProps } from '@atj/forms';

import { type PatternComponent } from '../../../Form';
import Checkbox from './Checkbox';

const CheckboxPattern: PatternComponent<CheckboxProps> = props => {
  return <Checkbox id={props.id} name={props.name} label={props.label} />;
};

export default CheckboxPattern;
