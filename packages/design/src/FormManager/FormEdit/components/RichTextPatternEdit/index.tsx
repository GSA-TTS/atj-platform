import classnames from 'classnames';
import React, { useState } from 'react';

import { PatternId, type RichTextProps } from '@atj/forms';
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

interface MenuBarProps {
  editor: Editor | null;
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

  return (
    <div className="bg-base-lightest padding-x-2 padding-y-1 border-bottom-1px border-base-light">
      <ul className="usa-button-group">
        <li className="usa-button-group__item">
          <button
            onClick={e => {
              e.preventDefault();
              return editor.chain().focus().toggleHeading({ level: 1 }).run();
            }}
            className={classNames('usa-button', 'font-body-2xs', {
              'usa-button--outline': !editor.isActive('heading', { level: 1 }),
            })}
          >
            Heading 1
          </button>
        </li>
        <li className="usa-button-group__item">
          <button
            onClick={e => {
              e.preventDefault();
              return editor.chain().focus().toggleHeading({ level: 2 }).run();
            }}
            className={classNames('usa-button', 'font-body-2xs', {
              'usa-button--outline': !editor.isActive('heading', { level: 2 }),
            })}
          >
            Heading 2
          </button>
        </li>
        <li className="usa-button-group__item">
          <button
            onClick={e => {
              e.preventDefault();
              return editor.chain().focus().toggleBold().run();
            }}
            className={classNames('usa-button', 'font-body-2xs', {
              'usa-button--outline': !editor.isActive('bold'),
            })}
          >
            Bold
          </button>
        </li>
        <li className="usa-button-group__item">
          <button
            onClick={e => {
              e.preventDefault();
              return editor.chain().focus().toggleBulletList().run();
            }}
            className={classNames('usa-button', 'font-body-2xs', {
              'usa-button--outline': !editor.isActive('bulletList'),
            })}
          >
            Bullet list
          </button>
        </li>
        <li className="usa-button-group__item">
          <button
            onClick={e => {
              e.preventDefault();
              return editor.chain().focus().toggleOrderedList().run();
            }}
            className={classNames('usa-button', 'font-body-2xs', {
              'usa-button--outline': !editor.isActive('orderedList'),
            })}
          >
            Ordered list
          </button>
        </li>
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

  const [editorContent, setEditorContent] = useState(pattern.data.text);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
    ],
    content: editorContent,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setEditorContent(content);
      setValue('text', content);
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
        <div className="border-1px border-base-light">
          <MenuBar editor={editor} />
          <EditorContent
            editor={editor}
            className="padding-2"
            aria-label="Edit and format this text"
            role="textbox"
          />
        </div>
        <input
          id={fieldId('text')}
          {...register('text')}
          defaultValue={pattern.data.text}
          type="hidden"
        ></input>
      </div>
      <PatternEditActions />
    </div>
  );
};
