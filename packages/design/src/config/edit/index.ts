import InputPatternEdit from './InputPatternEdit';
import SequencePatternEdit from './SequencePatternEdit';
import SubmissionConfirmationEdit from './SubmissionConfirmationEdit';
import { type EditComponentForPattern } from '../../FormManager/FormEdit/types';

export const defaultPatternEditComponents: EditComponentForPattern = {
  input: InputPatternEdit,
  sequence: SequencePatternEdit,
  'submission-confirmation': SubmissionConfirmationEdit,
};
