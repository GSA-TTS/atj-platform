import InputElementEdit from './InputElementEdit';
import { SequenceElementEdit } from './SequenceElementEdit';

export const getEditComponentForFormElement = (elementType: string) => {
  if (elementType === 'sequence') {
    return SequenceElementEdit;
  } else {
    return InputElementEdit;
  }
};
