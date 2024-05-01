import { type EditComponentForPattern } from '../types';

import CheckboxPatternEdit from './CheckboxPatternEdit';
import FieldsetEdit from './FieldsetEdit';
import FormSummaryEdit from './FormSummaryEdit';
import InputPatternEdit from './InputPatternEdit';
import ParagraphPatternEdit from './ParagraphPatternEdit';
import RadioGroupPatternEdit from './RadioGroupPatternEdit';
import SubmissionConfirmationEdit from './SubmissionConfirmationEdit';

export const defaultPatternEditComponents: EditComponentForPattern = {
  checkbox: CheckboxPatternEdit,
  paragraph: ParagraphPatternEdit,
  input: InputPatternEdit,
  'form-summary': FormSummaryEdit,
  fieldset: FieldsetEdit,
  'radio-group': RadioGroupPatternEdit,
  //sequence: SequencePatternEdit,
  //sequence: PreviewSequencePattern,
  'submission-confirmation': SubmissionConfirmationEdit,
};
