import { type ComponentForPattern } from '..';

import Address from './Address';
import CheckboxPattern from './Checkbox';
import Fieldset from './Fieldset';
import FormSummary from './FormSummary';
import Paragraph from './Paragraph';
import Sequence from './Sequence';
import SubmissionConfirmation from './SubmissionConfirmation';
import TextInput from './TextInput';

export const defaultPatternComponents: ComponentForPattern = {
  address: Address,
  checkbox: CheckboxPattern,
  fieldset: Fieldset,
  'form-summary': FormSummary,
  input: TextInput,
  paragraph: Paragraph,
  sequence: Sequence,
  'submission-confirmation': SubmissionConfirmation,
};
