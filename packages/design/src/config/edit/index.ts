import FormSummaryEdit from './FormSummaryEdit';
import InputPatternEdit from './InputPatternEdit';
import ParagraphPatternEdit from './ParagraphPatternEdit';
import SubmissionConfirmationEdit from './SubmissionConfirmationEdit';
import { type EditComponentForPattern } from '../../FormManager/FormEdit/types';

export const defaultPatternEditComponents: EditComponentForPattern = {
  paragraph: ParagraphPatternEdit,
  input: InputPatternEdit,
  'form-summary': FormSummaryEdit,
  //fieldset: SequencePatternEdit,
  //sequence: SequencePatternEdit,
  'submission-confirmation': SubmissionConfirmationEdit,
};
