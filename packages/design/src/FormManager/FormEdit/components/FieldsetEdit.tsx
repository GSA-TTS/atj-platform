import React from 'react';

import { PatternId, type FieldsetProps } from '@atj/forms';
import { FieldsetPattern } from '@atj/forms/src/patterns/fieldset';

import Fieldset from '../../../Form/components/Fieldset';

import { PatternEditActions } from '../PatternEditActions';
import { PatternEditLayout } from '../PatternEditLayout';
import { PatternEditComponent } from '../types';
import { usePattern } from '../store';

const FieldsetEdit: PatternEditComponent<FieldsetPattern> = props => {
  return (
    <PatternEditLayout
      patternId={props.previewProps._patternId}
      editComponent={
        <EditComponent patternId={props.previewProps._patternId} />
      }
      viewComponent={<Fieldset {...(props.previewProps as FieldsetProps)} />}
    ></PatternEditLayout>
  );
};

const EditComponent = ({ patternId }: { patternId: PatternId }) => {
  const pattern = usePattern(patternId);
  return (
    <div>
      Fieldset settings go here. {JSON.stringify(pattern)}
      <Fieldset type="fieldset" _patternId={patternId} />
      <PatternEditActions />
    </div>
  );
};

export default FieldsetEdit;
