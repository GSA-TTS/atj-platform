import React from 'react';

import { PatternId, type ParagraphProps } from '@atj/forms';

import Paragraph from '../../../Form/components/Paragraph';
import { useIsPatternSelected } from '../store';
import { PatternEditComponent } from '../types';

import { PatternEditActions } from './common/PatternEditActions';
import {
  PatternEditForm,
  usePatternEditFormContext,
} from './common/PatternEditForm';

const ParagraphPatternEdit: PatternEditComponent<ParagraphProps> = props => {
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
        <Paragraph {...props.previewProps} />
      )}
    </>
  );
};

const EditComponent = ({ patternId }: { patternId: PatternId }) => {
  const { register } = usePatternEditFormContext();
  return (
    <div className="grid-row grid-gap-1 edit-component-panel">
      <div className="desktop:grid-col-9 mobile:grid-col-12 flex-align-self-end">
        <label className="usa-label">
          Text Element
          <input
            className="usa-input bg-primary-lighter text-bold"
            {...register(`${patternId}.data.text`)}
            type="text"
          ></input>
        </label>
      </div>
      <div className="desktop:grid-col-3 mobile:grid-col-12 flex-align-self-end">
        <label className="usa-label">
          <p className="usa-hint">Style</p>
          <select className="usa-select bg-primary-lighter text-bold" {...register(`${patternId}.type`)}>
            <option value={'paragraph'}>Question</option> {/* this is a stub */}
            <option value={'paragraph'}>Title</option> {/* this is a stub */}
            <option value={'paragraph'}>Instructions</option>{' '}
            {/* this is a stub */}
          </select>
        </label>
      </div>
      <PatternEditActions />
    </div>
  );
};

export default ParagraphPatternEdit;
