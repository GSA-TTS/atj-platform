import { type Fact } from './fact';
import { type Prompt } from './prompt';

export type Question = Readonly<{
  id: string;
  fact: Fact;
  prompt: Prompt;
  next?: Question['id'];
}>;

export type QuestionMap = Record<Question['id'], Question>;
