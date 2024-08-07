import classnames from 'classnames';
import QuillEditor from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useState } from 'react';

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

export default RichTextPatternEdit;

const EditComponent = ({ patternId }: { patternId: PatternId }) => {
  const pattern = useFormManagerStore<RichTextPattern>(
    state => state.session.form.patterns[patternId]
  );
  const { fieldId, getFieldState, register } =
    usePatternEditFormContext<RichTextPattern>(patternId);
  const text = getFieldState('text')

  const [editorContent, setEditorContent] = useState(pattern.data.text);

  const handleEditorChange = (content, delta, source, editor) => {
    setEditorContent(editor.getHTML());
  }

  return (
    <div className="grid-row grid-gap-1">
      <div className="tablet:grid-col-12">
        <label
          className={classnames('usa-label', {
            'usa-label--error': text.error,
          })}
          htmlFor={fieldId('text')}
        >
          {message.patterns.paragraph.fieldLabel}
        </label>
        {text.error ? (
          <span className="usa-error-message" role="alert">
            {text.error.message}
          </span>
        ) : null}
        <QuillEditor
          theme="snow"
          value={editorContent}
          onChange={handleEditorChange}
        />
        <input
          id={fieldId('text')}
          {...register('text')}
          defaultValue={editorContent}
        ></input>
      </div>
      <PatternEditActions />
    </div>
  );
};
