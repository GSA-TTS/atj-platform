import { IStrategy } from '.';
import type { InterviewSummary, Interview } from '../interview';
import {
  type Prompt,
  createInterviewEndPrompt,
  createSingleFieldPrompt,
} from '../prompt';
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
          id: questionId,
        },
      ];
    })
  );
};

export const processSequentialStrategy = <
  I extends Interview,
  V extends
    I['questions'][QuestionId]['fact']['initial'] = I['questions'][QuestionId]['fact']['initial'],
>(
  interview: I,
  current: InterviewQuestion<I> | null,
  value: V
): Prompt<I> => {
  const temp = new SequentialStrategy(interview.strategy.data);
  return temp.nextPrompt(interview, current, value);
};

export class SequentialStrategy<I extends Interview> implements IStrategy<I> {
  constructor(private opts: SequentialStrategyData<I>) {}

  nextPrompt<
    I extends Interview,
    Q extends Extract<keyof I['questions'], QuestionId> = Extract<
      keyof I['questions'],
      QuestionId
    >,
    V extends
      I['questions'][Q]['fact']['initial'] = I['questions'][Q]['fact']['initial'],
  >(interview: I, currentQuestionId: Q, value: V) {
    if (currentQuestionId === null) {
      const questionId = this.opts.order[0];
      const question = interview.questions[questionId];
      const value = this.opts.initial;
      return createSingleFieldPrompt<I>(question.field, {
        id: questionId,
        value,
      });
    }
    const index = this.opts.order.indexOf(currentQuestionId);
    if (index === -1) {
      throw new Error(`not found: "${currentQuestionId}"`);
    }
    if (index === this.opts.order.length - 1) {
      return createInterviewEndPrompt('Thanks for completing this interview');
    } else {
      const questionId = this.opts.order[index + 1];
      const question = interview.questions[questionId];
      return createSingleFieldPrompt<I>(question.field, {
        id: questionId,
        value,
      });
    }
  }
}
