import { validAnswer, type AnswerMap } from './answer';
import { type Interview } from './interview';
import { type Prompt } from './prompt';
import { type QuestionId } from './question';
import { processStrategy } from './strategies';

export type InterviewContext<I extends Interview> = Readonly<{
  interview: I;
  prompt: Prompt<I>;
  answers: AnswerMap<I>;
  error?: string;
}>;

export const createInterviewContext = <I extends Interview>(
  interview: I
): InterviewContext<I> => {
  return {
    interview,
    prompt: processStrategy<I>(interview, interview.strategy, null, undefined),
    answers: {} as AnswerMap<I>,
  };
};

export type InterviewAction<
  I extends Interview,
  Q extends Extract<keyof I['questions'], QuestionId>,
  V extends I['questions'][Q]['fact']['initial'],
> = {
  type: 'answer-question';
  questionId: Q;
  value: V;
};

export const nextContext = <
  I extends Interview,
  C extends InterviewContext<I>,
  Q extends Extract<keyof I['questions'], QuestionId>,
  V extends I['questions'][Q]['fact']['initial'],
>(
  context: C,
  action: InterviewAction<I, Q, V>
): InterviewContext<I> => {
  if (action.type === 'answer-question') {
    return answerQuestion(context, action.questionId, action.value);
  } else {
    return action as never;
  }
};

export const answerQuestion = <
  I extends Interview,
  C extends InterviewContext<I>,
  Q extends Extract<keyof I['questions'], QuestionId>,
  V extends I['questions'][Q]['fact']['initial'],
>(
  context: C,
  questionId: Q,
  value: V
): InterviewContext<I> => {
  const question = context.interview.questions[questionId];
  if (question === undefined) {
    return {
      ...context,
      error: `invalid question ID: ${questionId}`,
    };
  }

  if (!validAnswer(question, value)) {
    return {
      ...context,
      error: `invalid answer: ${value}`,
    };
  }

  return {
    interview: context.interview,
    prompt: processStrategy(
      context.interview,
      context.interview.strategy,
      questionId,
      value
    ),
    answers: {
      ...context.answers,
      [questionId]: value,
    },
  };
};
