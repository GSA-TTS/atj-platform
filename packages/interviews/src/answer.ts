import { type factValueType, type Fact } from './fact';
import { type Interview } from './interview';
import { type Question } from './question';

export type Answer<F extends Fact> = factValueType<F>;

export type AnswerMap<I extends Interview> = Readonly<
  Record<
    I['questions'][string]['field']['id'],
    Answer<I['questions'][string]['fact']>
  >
>;

type A<T> = T extends Answer<infer F extends Fact> ? factValueType<F> : never;
export const validAnswer = <A>(question: Question, answer: A) => {
  // FIXME: actually validate
  return true;
};
