import { handleSubmit } from './actions/submit';
import { type AnswerMap } from './answer';
import { type Interview } from './interview';
import { type Prompt } from './prompt';
import { type FormElementId } from './element';
import { SequentialStrategy } from './strategies/sequential';

export type InterviewContext<I extends Interview> = Readonly<{
  interview: I;
  prompt: Prompt<I>;
  answers: AnswerMap<I>;
  error?: string;
}>;

const getStrategy = <I extends Interview>(interview: I) => {
  if (interview.strategy.type == 'sequential') {
    return new SequentialStrategy(interview.strategy.data);
  } else if (interview.strategy.type === 'not-implemented') {
    throw new Error('unimplemented strategy');
  } else {
    return interview.strategy as never;
  }
};

export const createInterviewContext = <I extends Interview>(
  interview: I
): InterviewContext<I> => {
  const strategy = getStrategy(interview);
  return {
    interview,
    prompt: strategy.nextPrompt(interview, null, undefined),
    answers: {} as AnswerMap<I>,
  };
};

export type InterviewAction<
  I extends Interview,
  Q extends Extract<keyof I['elements'], FormElementId>,
  V extends I['elements'][Q]['fact']['initial'],
> =
  | {
      type: 'answer-element';
      elementId: Q;
      value: V;
    }
  | {
      type: 'submit';
      formData: FormData;
    };

export const nextContext = <
  I extends Interview,
  C extends InterviewContext<I>,
  Q extends Extract<keyof I['elements'], FormElementId>,
  V extends I['elements'][Q]['fact']['initial'],
>(
  context: C,
  action: InterviewAction<I, Q, V>
): InterviewContext<I> => {
  if (action.type === 'submit') {
    const strategy = getStrategy(context.interview);
    return handleSubmit(context, strategy, action.formData);
  } else {
    return action as never;
  }
};
