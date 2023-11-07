import { type Fact } from './fact';
import { type Prompt } from './prompt';

export type QuestionId = string;

export type Question = Readonly<{
  fact: Fact;
  prompt: Prompt;
}>;

export type QuestionMap = Record<QuestionId, Question>;
