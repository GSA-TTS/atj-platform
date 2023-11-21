import { Fact } from './fact';
import { type Interview } from './interview';
import { type QuestionId } from './question';

// Initially, make this very basic. We may want to support variants of prompts
// for multi-language, or to provide alternative presentation formats.
export type Field<F extends Fact> = Readonly<{
  type: F['type'];
  id: QuestionId;
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
  fields: Field<I['questions'][QuestionId]['fact']>[];
  buttons: Button[];
  information?: string;
}>;

export const createSingleFieldPrompt = <I extends Interview>(
  field: Field<I['questions'][QuestionId]['fact']>,
  data?: { id: QuestionId; value: any }
): Prompt<I> => {
  return {
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
