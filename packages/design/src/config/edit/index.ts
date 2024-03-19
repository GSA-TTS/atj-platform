import InputElementEdit from './InputElementEdit';
import SequenceElementEdit from './SequenceElementEdit';
import SubmissionConfirmationEdit from './SubmissionConfirmationEdit';
import { type EditComponentForFormElement } from '../../FormManager/FormEdit/types';

export const defaultFormElementEditComponents: EditComponentForFormElement = {
  input: InputElementEdit,
  sequence: SequenceElementEdit,
  'submission-confirmation': SubmissionConfirmationEdit,
};
