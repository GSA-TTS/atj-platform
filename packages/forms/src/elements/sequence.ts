import { FormElementId } from '.';

export type SequenceElement = {
  id: FormElementId;
  type: 'sequence';
  elements: FormElementId[];
  initial: [];
};
