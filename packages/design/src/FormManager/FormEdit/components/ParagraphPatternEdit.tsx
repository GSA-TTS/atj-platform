import React from 'react';

import { PatternId, type ParagraphProps } from '@atj/forms';

import Paragraph from '../../../Form/components/Paragraph';
import { PatternEditComponent } from '../types';

import { PatternEditActions } from './common/PatternEditActions';
import { PatternEditForm } from './common/PatternEditForm';
import { usePatternEditFormContext } from './common/hooks';

const ParagraphPatternEdit: PatternEditComponent<ParagraphProps> = ({
  focus,
  previewProps,
}) => {
  return (
    <>
      {focus ? (
        <PatternEditForm
          pattern={focus.pattern}
          editComponent={<EditComponent patternId={focus.pattern.id} />}
        ></PatternEditForm>
      ) : (
        <Paragraph {...previewProps} />
      )}
    </>
  );
};

const EditComponent = ({ patternId }: { patternId: PatternId }) => {
  const { register } = usePatternEditFormContext(patternId);
  return (
    <div className="grid-row grid-gap-1 edit-component-panel">
      <div className="desktop:grid-col-9 mobile:grid-col-12 flex-align-self-end">
        <label className="usa-label">
          Text Element
          <input
            className="usa-input bg-primary-lighter text-bold"
            {...register('data.text')}
            type="text"
          ></input>
        </label>
      </div>
      <div className="desktop:grid-col-3 mobile:grid-col-12 flex-align-self-end">
        <label className="usa-label">
          <p className="usa-hint">Style</p>
          <select
            className="usa-select bg-primary-lighter text-bold"
            {...register('type')}
          >
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
