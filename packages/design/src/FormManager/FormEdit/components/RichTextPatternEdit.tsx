import classnames from 'classnames';
import React from 'react';

import { PatternId, type RichTextProps } from '@atj/forms';
import { type RichTextPattern } from '@atj/forms/src/patterns/rich-text';

import RichText from '../../../Form/components/RichText';
import { PatternEditComponent } from '../types';

import { PatternEditActions } from './common/PatternEditActions';
import { PatternEditForm } from './common/PatternEditForm';
import { usePatternEditFormContext } from './common/hooks';
import { useFormManagerStore } from '../../store';
import { en as message } from '@atj/common/src/locales/en/app';

const RichTextPatternEdit: PatternEditComponent<RichTextProps> = ({
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
        <div className="padding-left-3 padding-bottom-3 padding-right-3">
          <RichText {...previewProps} />
        </div>
      )}
    </>
  );
};

const EditComponent = ({ patternId }: { patternId: PatternId }) => {
  const pattern = useFormManagerStore<RichTextPattern>(
    state => state.session.form.patterns[patternId]
  );
  const { fieldId, getFieldState, register } =
    usePatternEditFormContext<RichTextPattern>(patternId);
  const text = getFieldState('text');

  return (
    <div className="grid-row grid-gap-1">
      <div className="tablet:grid-col-12">
        <label
          className={classnames('usa-label', {
            'usa-label--error': text.error,
          })}
          htmlFor={fieldId('text')}
        >
          {message.patterns.richText.fieldLabel}
        </label>
        {text.error ? (
          <span className="usa-error-message" role="alert">
            {text.error.message}
          </span>
        ) : null}
        <textarea
          id={fieldId('text')}
          className="usa-textarea bg-primary-lighter text-bold"
          style={{ height: 'unset' }}
          rows={4}
          {...register('text')}
          defaultValue={pattern.data.text}
          autoFocus
        ></textarea>
      </div>
      <PatternEditActions />
    </div>
  );
};

export default RichTextPatternEdit;
