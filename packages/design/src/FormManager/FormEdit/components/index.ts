import FieldsetEdit from './FieldsetEdit';
import FormSummaryEdit from './FormSummaryEdit';
import InputPatternEdit from './InputPatternEdit';
import ParagraphPatternEdit from './ParagraphPatternEdit';
import SubmissionConfirmationEdit from './SubmissionConfirmationEdit';
import { type EditComponentForPattern } from '../types';

export const defaultPatternEditComponents: EditComponentForPattern = {
  paragraph: ParagraphPatternEdit,
  input: InputPatternEdit,
  'form-summary': FormSummaryEdit,
  fieldset: FieldsetEdit,
  //sequence: SequencePatternEdit,
  //sequence: PreviewSequencePattern,
  'submission-confirmation': SubmissionConfirmationEdit,
};
