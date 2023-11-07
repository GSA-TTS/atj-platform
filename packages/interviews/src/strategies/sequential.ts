import type { InterviewSummary, Interview } from '../interview';
import type { Question, QuestionId } from '../question';

export type SequentialStrategyData = {
  order: QuestionId[];
};

export const createSequentialInterview = (
  summary: InterviewSummary,
  questionList: Question[]
): Interview => {
  const questions = sequentialQuestionsFromList(questionList);
  return {
    summary,
    questions,
    strategy: {
      type: 'sequential',
      data: {
        order: Object.keys(questions),
      },
    },
  };
};

const sequentialQuestionsFromList = (questionList: Question[]) =>
  Object.fromEntries(
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
