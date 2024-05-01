import { type ComponentForPattern } from '..';

import Address from './Address';
import Checkbox from './Checkbox';
import Fieldset from './Fieldset';
import FormSummary from './FormSummary';
import Paragraph from './Paragraph';
import RadioGroup from './RadioGroup';
import Sequence from './Sequence';
import SubmissionConfirmation from './SubmissionConfirmation';
import TextInput from './TextInput';

export const defaultPatternComponents: ComponentForPattern = {
  address: Address,
  checkbox: Checkbox,
  fieldset: Fieldset,
  'form-summary': FormSummary,
  input: TextInput,
  paragraph: Paragraph,
  'radio-group': RadioGroup,
  sequence: Sequence,
  'submission-confirmation': SubmissionConfirmation,
};
