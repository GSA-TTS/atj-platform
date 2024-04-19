import React from 'react';

import { PatternId, type FieldsetProps } from '@atj/forms';
import { FieldsetPattern } from '@atj/forms/src/patterns/fieldset';

import Fieldset from '../../../Form/components/Fieldset';

import { PatternEditActions } from '../PatternEditActions';
import { PatternEditForm } from '../PatternEditForm';
import { useIsPatternSelected, usePattern } from '../store';
import { PatternEditComponent } from '../types';

const FieldsetEdit: PatternEditComponent<FieldsetProps> = props => {
  const isSelected = useIsPatternSelected(props.previewProps._patternId);
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
  const pattern = usePattern<FieldsetPattern>(props._patternId);
  return (
    <>
      {pattern.data.patterns.length === 0 && <em>[Empty fieldset]</em>}
      <Fieldset {...(props as FieldsetProps)} />
    </>
  );
};

const EditComponent = ({ patternId }: { patternId: PatternId }) => {
  const pattern = usePattern(patternId);
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
