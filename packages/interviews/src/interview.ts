import { type Question } from './question';

export type Interview = {
  title: string;
  description: string;
  questions: Question[];
};
