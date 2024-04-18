import React from 'react';

import { FieldsetPattern } from '@atj/forms/src/patterns/fieldset';

import { PatternEditComponent } from '../types';
import Fieldset from '../../../Form/components/Fieldset';
import { PatternEditActions } from '../PatternEditActions';

const FieldsetEdit: PatternEditComponent<FieldsetPattern> = ({ pattern }) => {
  return (
    <div>
      Fieldset settings go here. {JSON.stringify(pattern)}
      <Fieldset {...pattern} type="fieldset" _patternId={pattern.id} />
      <PatternEditActions />
    </div>
  );
};

export default FieldsetEdit;
