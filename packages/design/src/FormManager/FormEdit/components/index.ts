import { ComponentForPattern } from '../../../Form';

import FieldsetEdit from './FieldsetEdit';
import FormSummaryEdit from './FormSummaryEdit';
import InputPatternEdit from './InputPatternEdit';
import ParagraphPatternEdit from './ParagraphPatternEdit';
import SequencePatternEdit from './SequencePatternEdit';
import SubmissionConfirmationEdit from './SubmissionConfirmationEdit';

export const defaultPatternEditComponents: ComponentForPattern = {
  paragraph: ParagraphPatternEdit,
  input: InputPatternEdit,
  'form-summary': FormSummaryEdit,
  fieldset: FieldsetEdit,
  sequence: SequencePatternEdit,
  'submission-confirmation': SubmissionConfirmationEdit,
};
