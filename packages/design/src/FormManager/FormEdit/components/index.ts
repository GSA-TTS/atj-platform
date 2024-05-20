import {
  type PatternEditComponent,
  type EditComponentForPattern,
} from '../types';

import CheckboxPatternEdit from './CheckboxPatternEdit';
import FieldsetEdit from './FieldsetEdit';
import FormSummaryEdit from './FormSummaryEdit';
import InputPatternEdit from './InputPatternEdit';
import ParagraphPatternEdit from './ParagraphPatternEdit';
import { PatternPreviewSequence } from './PreviewSequencePattern';
import RadioGroupPatternEdit from './RadioGroupPatternEdit';
import SubmissionConfirmationEdit from './SubmissionConfirmationEdit';

export const defaultPatternEditComponents: EditComponentForPattern = {
  checkbox: CheckboxPatternEdit as PatternEditComponent,
  paragraph: ParagraphPatternEdit as PatternEditComponent,
  input: InputPatternEdit as PatternEditComponent,
  'form-summary': FormSummaryEdit as PatternEditComponent,
  fieldset: FieldsetEdit as PatternEditComponent,
  page: FieldsetEdit as PatternEditComponent,
  'radio-group': RadioGroupPatternEdit as PatternEditComponent,
  sequence: PatternPreviewSequence as PatternEditComponent,
  'submission-confirmation': SubmissionConfirmationEdit as PatternEditComponent,
};
