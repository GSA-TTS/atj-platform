import { type Fact } from './fact';
import { type Interview } from './interview';
import { type Field } from './prompt';

export type FormElementId = string;

export type FormElement = Readonly<{
  fact: Fact;
  //prompt: Prompt;
  field: Field<Fact>;
}>;

export type FormElementMap = Record<FormElementId, FormElement>;
export type InterviewFormElement<I extends Interview> = Extract<
  keyof I['elements'],
  string
>;
