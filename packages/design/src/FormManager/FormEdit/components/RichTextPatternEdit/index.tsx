import classnames from 'classnames';
import React, { useState } from 'react';
import debounce from 'debounce';

import { PatternId, PatternMap, type RichTextProps } from '@atj/forms';
import { type RichTextPattern } from '@atj/forms/src/patterns/rich-text';

import RichText from '../../../../Form/components/RichText';
import { PatternEditActions } from '../common/PatternEditActions';
import { PatternEditForm } from '../common/PatternEditForm';
import { usePatternEditFormContext } from '../common/hooks';
import { useFormManagerStore } from '../../../store';
import { en as message } from '@atj/common/src/locales/en/app';
import { EditorContent, useEditor } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { PatternEditComponent } from '../../types';
import classNames from 'classnames';
import styles from './richTextPatternEditStyles.module.css';

interface MenuBarProps {
  editor: Editor | null;
}

type RichTextFormData = PatternMap & {
  [p: string]: {
    text: string;
  };
};

interface EditorActions {
  label: string;
  property: string;
  action: () => void;
  disabled: boolean;
  parameter?: Record<string, unknown>;
}

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
          <p>{message.patterns.richText.displayName}</p>
          <RichText {...previewProps} />
        </div>
      )}
    </>
  );
};

export default RichTextPatternEdit;

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const editorActions: Array<EditorActions> = [
    {
      label: 'Heading',
      property: 'heading',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      disabled: false,
      parameter: { level: 2 },
    },
    {
      label: 'Subheading',
      property: 'heading',
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      disabled: false,
      parameter: { level: 3 },
    },
    {
      label: 'Bold',
      property: 'bold',
      action: () => editor.chain().focus().toggleBold().run(),
      disabled: !editor.can().chain().focus().toggleBold().run(),
    },
    {
      label: 'Italic',
      property: 'italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
    },
    {
      label: 'Bullet list',
      property: 'bulletList',
      action: () => editor.chain().focus().toggleBulletList().run(),
      disabled: false,
    },
    {
      label: 'Ordered list',
      property: 'orderedList',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      disabled: false,
    },
  ];

  return (
    <div className="bg-base-lightest padding-x-2 padding-y-1 border-bottom-1px border-base-light">
      <ul className="usa-button-group">
        {editorActions.map(
          ({ label, action, parameter, property, disabled }, index) => (
            <li className="usa-button-group__item" key={index}>
              <button
                type="button"
                onClick={e => {
                  e.preventDefault();
                  return action();
                }}
                className={classNames('usa-button', 'font-body-2xs', {
                  'usa-button--outline': !editor.isActive(property, parameter),
                })}
                disabled={disabled}
              >
                {label}
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

const EditComponent = ({ patternId }: { patternId: PatternId }) => {
  const pattern = useFormManagerStore<RichTextPattern>(
    state => state.session.form.patterns[patternId]
  );
  const { fieldId, getFieldState, register, setValue } =
    usePatternEditFormContext<RichTextPattern>(patternId);
  const text = getFieldState('text');
  const { updateActivePattern } = useFormManagerStore(state => ({
    updateActivePattern: state.updateActivePattern,
  }));

  const [editorContent, setEditorContent] = useState(pattern.data.text);
  const debouncedUpdate = debounce(updateActivePattern, 200);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
    ],
    autofocus: true,
    content: editorContent,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setEditorContent(content);
      setValue('text', content);
      const data: RichTextFormData = {
        [patternId]: {
          ...pattern,
          text: content,
        },
      };
      debouncedUpdate(data);
    },
  });

  return (
    <div className="grid-row grid-gap-1">
      <div className="tablet:grid-col-12">
        <p
          className={classnames('usa-label', {
            'usa-label--error': text.error,
          })}
        >
          {message.patterns.richText.fieldLabel}
        </p>
        {text.error ? (
          <span className="usa-error-message" role="alert">
            {text.error.message}
          </span>
        ) : null}
        <div
          className={`${styles.richTextEditorWrapper} border-1px border-base-light`}
        >
          <MenuBar editor={editor} />
          <EditorContent
            editor={editor}
            className={`padding-2 ${styles.richTextEditorBody}`}
            aria-label="Edit and format this text"
            spellCheck="false"
            role="textbox"
          />
        </div>
        <input
          id={fieldId('text')}
          {...register('text', {
            required: false,
          })}
          defaultValue={pattern.data.text}
          type="hidden"
        ></input>
      </div>
      <PatternEditActions />
    </div>
  );
};
