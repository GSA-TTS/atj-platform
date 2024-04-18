import React from 'react';

import { FieldsetProps } from '@atj/forms';

import { PatternComponent } from '../../../Form';
import Fieldset from '../../../Form/components/Fieldset';
import { PatternEditActions } from '../PatternEditActions';
import { PatternEditForm } from '../PatternEditForm';
import { useFormEditStore } from '../store';

const FieldsetEdit: PatternComponent<FieldsetProps> = props => {
  const focusedPattern = useFormEditStore(state => state.focusedPattern);
  const showEditUI = focusedPattern?.id === props._patternId;
  return (
    <div>
      {showEditUI ? (
        <PatternEditForm>
          Fieldset settings go here. {JSON.stringify(props)}
          {props.children}
        </PatternEditForm>
      ) : (
        <Fieldset {...props}>{props.children}</Fieldset>
      )}
      <PatternEditActions />
    </div>
  );
};

export default FieldsetEdit;
