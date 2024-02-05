import { Fact } from './fact';
import { type Interview } from './interview';
import { type FormElementId } from './element';

type PromptId = string;
const InterviewEndPrompt: PromptId = 'interview-end';

// Initially, make this very basic. We may want to support variants of prompts
// for multi-language, or to provide alternative presentation formats.
export type Field<F extends Fact> = Readonly<{
  type: F['type'];
  id: FormElementId;
  name: string;
  required: boolean;
  title: string;
  description?: string;
  placeholder?: string;
  value?: F['initial'];
}>;

export type Button = Readonly<{
  disabled: boolean;
  name: string;
  text: string;
}>;

export type Prompt<I extends Interview> = Readonly<{
  id: PromptId;
  fields: Field<I['elements'][FormElementId]['fact']>[];
  buttons: Button[];
  information?: string;
}>;

export const createSingleFieldPrompt = <I extends Interview>(
  field: Field<I['elements'][FormElementId]['fact']>,
  data?: { id: FormElementId; value: any }
): Prompt<I> => {
  return {
    id: field.id,
    fields: [
      data
        ? {
            ...field,
            id: data.id,
            value: data.value,
          }
        : field,
    ],
    buttons: [
      {
        disabled: false,
        name: 'back',
        text: 'Back',
      },
      {
        disabled: false,
        name: 'next',
        text: 'Next',
      },
    ],
  };
};

export const createInterviewEndPrompt = <I extends Interview>(
  information: string
): Prompt<I> => {
  return {
    id: InterviewEndPrompt,
    information,
    fields: [],
    buttons: [
      {
        disabled: false,
        name: 'back',
        text: 'Back',
      },
    ],
  };
};
