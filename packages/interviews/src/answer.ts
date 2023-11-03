import { type factValueType, type Fact } from './fact';
import { type Interview } from './interview';
import { type Question } from './question';

export type Answer<F extends Fact> = factValueType<F>;

export type AnswerMap<I extends Interview> = Readonly<
  Record<I['questions'][string]['id'], Answer<I['questions'][string]['fact']>>
>;

export const validAnswer = <A extends Answer<F>, F extends Fact>(
  question: Question,
  answer: A
) => {
  // FIXME: actually validate
  return true;
};
