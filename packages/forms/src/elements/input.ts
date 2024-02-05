import { FormElementId } from '.';

export type InputElement = {
  id: FormElementId;
  text: string;
  initial: string | boolean | string[]; // TODO: create separate types
  required: boolean;
};
