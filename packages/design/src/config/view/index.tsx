import FormSummary from './FormSummary';
import Paragraph from './Paragraph';
import Sequence from './Sequence';
import SubmissionConfirmation from './SubmissionConfirmation';
import TextInput from './TextInput';

import { type ComponentForPattern } from '../../Form';

export const defaultFormElementComponents: ComponentForPattern = {
  'form-summary': FormSummary,
  input: TextInput,
  paragraph: Paragraph,
  sequence: Sequence,
  'submission-confirmation': SubmissionConfirmation,
};
