import { validAnswer, type Answer, type AnswerMap } from './answer';
import { type Interview } from './interview';

export type InterviewContext<I extends Interview> = Readonly<{
  interview: I;
  current: I['questions'][string]['id'] | null;
  answers: AnswerMap<I>;
  error?: string;
}>;

export const createInterviewContext = <I extends Interview>(
  interview: I
): InterviewContext<I> => {
  return {
    interview,
    current: interview.questions[0].id,
    answers: {} as AnswerMap<I>,
  };
};

export const answerQuestion = <
  I extends Interview,
  C extends InterviewContext<I>,
  Q extends I['questions'][string]['id'],
>(
  context: C,
  questionId: Q,
  answer: Answer<I['questions'][string]['fact']>
): InterviewContext<I> => {
  const question = context.interview.questions[questionId];

  if (!validAnswer(question, answer)) {
    return {
      ...context,
      error: `invalid answer: ${answer}`,
    };
  }

  return {
    interview: context.interview,
    current: question.next || null,
    answers: {
      ...context.answers,
      [questionId]: answer,
    },
  };
};
