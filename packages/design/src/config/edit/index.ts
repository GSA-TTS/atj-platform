import InputElementEdit from './InputElementEdit';
import SequenceElementEdit from './SequenceElementEdit';
import SubmissionConfirmationEdit from './SubmissionConfirmationEdit';
import { type EditComponentForPattern } from '../../FormManager/FormEdit/types';

export const defaultPatternEditComponents: EditComponentForPattern = {
  input: InputElementEdit,
  sequence: SequenceElementEdit,
  'submission-confirmation': SubmissionConfirmationEdit,
};
