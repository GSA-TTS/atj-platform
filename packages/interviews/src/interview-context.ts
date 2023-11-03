import { type Facts } from './fact';
import { type Interview } from './interview';
import { type Question } from './question';

export type InterviewContext<I extends Interview> = {
  current: I['questions'][number]['id'];
  answers: Record<
    I['questions'][number]['id'],
    Facts.factValueType<I['questions'][number]['fact']>
  >;
  question: Question;
};
