import classnames from 'classnames';
import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Quill from 'quill';
import "quill/dist/quill.snow.css";

import { PatternId, type RichTextProps } from '@atj/forms';
import { type RichTextPattern } from '@atj/forms/src/patterns/rich-text';

import RichText from '../../../Form/components/RichText';
import { PatternEditComponent } from '../types';

import { PatternEditActions } from './common/PatternEditActions';
import { PatternEditForm } from './common/PatternEditForm';
import { usePatternEditFormContext } from './common/hooks';
import { useFormManagerStore } from '../../store';
import { en as message } from '@atj/common/src/locales/en/app';

const Delta = Quill.import('delta');

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
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  const pattern = useFormManagerStore<RichTextPattern>(
    state => state.session.form.patterns[patternId]
  );
  console.log(pattern);
  const { fieldId, getFieldState, register } =
    usePatternEditFormContext<RichTextPattern>(patternId);
  const text = getFieldState('text');
  console.log(register('text'));

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
        <div>
          <Editor
            ref={quillRef}
            readOnly={readOnly}
            defaultValue={new Delta()
              .insert('Hello')
              .insert('\n', { header: 1 })
              .insert('Some ')
              .insert('initial', { bold: true })
              .insert(' ')
              .insert('content', { underline: true })
              .insert('\n')}
            onSelectionChange={setRange}
            onTextChange={setLastChange}
          />
          <div className="controls">
            <label>
              Read Only:{' '}
              <input
                type="checkbox"
                value={readOnly}
                onChange={e => setReadOnly(e.target.checked)}
              />
            </label>
            <button
              className="controls-right"
              type="button"
              onClick={() => {
                alert(quillRef.current?.getLength());
              }}
            >
              Get Content Length
            </button>
          </div>
          <div className="state">
            <div className="state-title">Current Range:</div>
            {range ? JSON.stringify(range) : 'Empty'}
          </div>
          <div className="state">
            <div className="state-title">Last Change:</div>
            {lastChange ? JSON.stringify(lastChange.ops) : 'Empty'}
          </div>
        </div>
      </div>
      <PatternEditActions />
    </div>
  );
};

export default RichTextPatternEdit;

// Editor is an uncontrolled React component
const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      ref.current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div')
      );
      const quill = new Quill(editorContainer, {
        theme: 'snow',
      });

      ref.current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        ref.current = null;
        container.innerHTML = '';
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  }
);

Editor.displayName = 'Editor';