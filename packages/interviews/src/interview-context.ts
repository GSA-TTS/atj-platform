import { validAnswer, type Answer, type AnswerMap } from './answer';
import { type Interview } from './interview';
import { type QuestionId } from './question';
import { processStrategy } from './strategies';

export const InterviewEnd = null;
export type InterviewEnd = typeof InterviewEnd;

export type InterviewContext<I extends Interview> = Readonly<{
  interview: I;
  current: Extract<keyof I['questions'], QuestionId> | InterviewEnd;
  answers: AnswerMap<I>;
  error?: string;
}>;

export const createInterviewContext = <I extends Interview>(
  interview: I
): InterviewContext<I> => {
  return {
    interview,
    current: processStrategy<typeof interview>(interview.strategy, null),
    answers: {} as AnswerMap<I>,
  };
};

export const answerQuestion = <
  I extends Interview,
  C extends InterviewContext<I>,
  Q extends Extract<keyof I['questions'], QuestionId>,
>(
  context: C,
  questionId: Q,
  answer: Answer<I['questions'][string]['fact']>
): InterviewContext<I> => {
  const question = context.interview.questions[questionId];
  if (question === undefined) {
    return {
      ...context,
      error: `invalid question ID: ${questionId}`,
    };
  }

  if (!validAnswer(question, answer)) {
    return {
      ...context,
      error: `invalid answer: ${answer}`,
    };
  }

  return {
    interview: context.interview,
    current: processStrategy(context.interview.strategy, context.current),
    answers: {
      ...context.answers,
      [questionId]: answer,
    },
  };
};
