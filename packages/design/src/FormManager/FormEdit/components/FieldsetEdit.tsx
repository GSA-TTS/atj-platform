import React from 'react';

import { PatternEditComponent } from '../types';
import { FieldsetPattern } from '@atj/forms/src/patterns/fieldset';

const FieldsetEdit: PatternEditComponent<FieldsetPattern> = ({ pattern }) => {
  return <div>Fieldset settings go here. {JSON.stringify(pattern)}</div>;
};

export default FieldsetEdit;
