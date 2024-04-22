import React from 'react';

import { type PatternId, type FieldsetProps } from '@atj/forms';

import Fieldset from '../../../Form/components/Fieldset';
import { useFormEditStore } from '../../store';
import { PatternEditComponent } from '../types';

import { PatternEditActions } from './common/PatternEditActions';
import { PatternEditForm } from './common/PatternEditForm';

const FieldsetEdit: PatternEditComponent<FieldsetProps> = props => {
  const isSelected = useFormEditStore(
    state => state.focusedPattern?.id === props.previewProps._patternId
  );
  return (
    <>
      {isSelected ? (
        <PatternEditForm
          patternId={props.previewProps._patternId}
          editComponent={
            <EditComponent patternId={props.previewProps._patternId} />
          }
        ></PatternEditForm>
      ) : (
        <FieldsetPreview {...props.previewProps} />
      )}
    </>
  );
};

const FieldsetPreview = (props: FieldsetProps) => {
  const pattern = useFormEditStore(
    state => state.form.patterns[props._patternId]
  );
  return (
    <>
      {pattern.data.patterns.length === 0 && <em>[Empty fieldset]</em>}
      <Fieldset {...(props as FieldsetProps)} />
    </>
  );
};

const EditComponent = ({ patternId }: { patternId: PatternId }) => {
  const pattern = useFormEditStore(state => state.form.patterns[patternId]);
  //const { register } = usePatternEditFormContext();
  return (
    <div>
      Fieldset settings go here. {JSON.stringify(pattern)}
      <Fieldset type="fieldset" _patternId={patternId} />
      <PatternEditActions />
    </div>
  );
};

export default FieldsetEdit;
