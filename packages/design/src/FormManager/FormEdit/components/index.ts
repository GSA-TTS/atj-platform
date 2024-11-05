import {
  type PatternEditComponent,
  type EditComponentForPattern,
} from '../types.js';

import AttachmentPatternEdit from './AttachmentPatternEdit/AttachmentPatternEdit.js';
import CheckboxPatternEdit from './CheckboxPatternEdit.js';
import FieldsetEdit from './FieldsetEdit.js';
import FormSummaryEdit from './FormSummaryEdit.js';
import InputPatternEdit from './InputPatternEdit.js';
import { PageEdit } from './PageEdit.js';
import PageSetEdit from './PageSetEdit.js';
import ParagraphPatternEdit from './ParagraphPatternEdit.js';
import { PatternPreviewSequence } from './PreviewSequencePattern/index.js';
import RadioGroupPatternEdit from './RadioGroupPatternEdit.js';
import RichTextPatternEdit from './RichTextPatternEdit/index.js';
import SubmissionConfirmationEdit from './SubmissionConfirmationEdit.js';

export const defaultPatternEditComponents: EditComponentForPattern = {
  attachment: AttachmentPatternEdit as PatternEditComponent,
  checkbox: CheckboxPatternEdit as PatternEditComponent,
  paragraph: ParagraphPatternEdit as PatternEditComponent,
  input: InputPatternEdit as PatternEditComponent,
  'form-summary': FormSummaryEdit as PatternEditComponent,
  fieldset: FieldsetEdit as PatternEditComponent,
  page: PageEdit as PatternEditComponent,
  'page-set': PageSetEdit as PatternEditComponent,
  'radio-group': RadioGroupPatternEdit as PatternEditComponent,
  'rich-text': RichTextPatternEdit as PatternEditComponent,
  sequence: PatternPreviewSequence as PatternEditComponent,
  'submission-confirmation': SubmissionConfirmationEdit as PatternEditComponent,
};
