import { FormElementId } from '.';

export type InputElement = {
  type: 'input';
  id: FormElementId;
  text: string;
  initial: string | boolean | string[]; // TODO: create separate types
  required: boolean;
};
