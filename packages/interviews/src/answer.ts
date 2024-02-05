import { type factValueType, type Fact } from './fact';
import { type Interview } from './interview';
import { type FormElement } from './element';

export type Answer<F extends Fact> = factValueType<F>;

export type AnswerMap<I extends Interview> = Readonly<
  Record<
    I['elements'][string]['field']['id'],
    Answer<I['elements'][string]['fact']>
  >
>;

type A<T> = T extends Answer<infer F extends Fact> ? factValueType<F> : never;
export const validAnswer = <A>(element: FormElement, answer: A) => {
  // FIXME: actually validate
  return true;
};
