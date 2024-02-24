import { type FormConfig, type PromptPart } from '@atj/forms';
import FormSummary from './FormSummary';
import SubmissionConfirmation from './SubmissionConfirmation';
import TextInput from './TextInput';
import { FormElementComponent } from '../../Form';

export type FormUIContext = {
  config: FormConfig;
  components: ComponentForPromptPart;
};

export type ComponentForPromptPart<T extends PromptPart = PromptPart> = Record<
  string,
  FormElementComponent<T>
>;

export const defaultFormElementComponent: ComponentForPromptPart = {
  'form-summary': FormSummary,
  sequence: SubmissionConfirmation,
  'submission-confirmation': SubmissionConfirmation,
  input: TextInput,
};
