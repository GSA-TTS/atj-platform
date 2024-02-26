import FormSummary from './FormSummary';
import SubmissionConfirmation from './SubmissionConfirmation';
import TextInput from './TextInput';

import { type ComponentForPattern } from '../../Form';

export const defaultFormElementComponent: ComponentForPattern = {
  'form-summary': FormSummary,
  sequence: SubmissionConfirmation,
  'submission-confirmation': SubmissionConfirmation,
  input: TextInput,
};
