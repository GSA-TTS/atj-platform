import { type QuestionMap } from './question';
import { type Strategy } from './strategies';

export type InterviewSummary = Readonly<{
  title: string;
  description: string;
}>;

export type Interview = Readonly<{
  summary: InterviewSummary;
  strategy: Strategy;
  questions: QuestionMap;
}>;
