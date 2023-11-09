import type { InterviewSummary, Interview } from '../interview';
import type { InterviewQuestion, Question, QuestionId } from '../question';

export type SequentialStrategyData<I extends Interview> = {
  initial: InterviewQuestion<I>;
  order: InterviewQuestion<I>[];
};

export type SequentialInterview = {
  summary: InterviewSummary;
  questionList: Question[];
};

export const createSequentialInterview = (
  opts: SequentialInterview
): Interview => {
  const questions = sequentialQuestionsFromList(opts.questionList);
  return {
    summary: opts.summary,
    questions,
    strategy: {
      type: 'sequential',
      data: {
        initial: 'question-1',
        order: Object.keys(questions),
      },
    },
  };
};

const sequentialQuestionsFromList = (questionList: Question[]) => {
  return Object.fromEntries(
    questionList.map((question, index) => {
      const questionId: QuestionId = `question-${index + 1}`;
      return [
        questionId,
        {
          ...question,
        },
      ];
    })
  );
};
