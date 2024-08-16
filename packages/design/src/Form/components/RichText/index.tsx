import React from 'react';

import { type RichTextProps } from '@atj/forms';
import { en as message } from '@atj/common/src/locales/en/app';
import { type PatternComponent } from '../../../Form';
import styles from './richTextStyles.module.css';

const FormSummary: PatternComponent<RichTextProps> = props => {
  return (
    <div className={`${styles.richTextEditorWrapper}`}>
      <p>{message.patterns.richText.displayName}</p>
      <div dangerouslySetInnerHTML={{ __html: props.text }} />
    </div>
  );
};
export default FormSummary;
