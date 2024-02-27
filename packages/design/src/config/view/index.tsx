import FormSummary from './FormSummary';
import Sequence from './Sequence';
import SubmissionConfirmation from './SubmissionConfirmation';
import TextInput from './TextInput';

import { type ComponentForPattern } from '../../Form';

export const defaultFormElementComponents: ComponentForPattern = {
  'form-summary': FormSummary,
  sequence: Sequence,
  'submission-confirmation': SubmissionConfirmation,
  input: TextInput,
};
