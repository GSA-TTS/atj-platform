import { type Fact } from './fact';
import { type Interview } from './interview';
import { type Field } from './prompt';

export type QuestionId = string;

export type Question = Readonly<{
  fact: Fact;
  //prompt: Prompt;
  field: Field<Fact>;
}>;

export type QuestionMap = Record<QuestionId, Question>;
export type InterviewQuestion<I extends Interview> = Extract<
  keyof I['questions'],
  string
>;
