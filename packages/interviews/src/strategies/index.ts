import { type Interview } from '../interview';
import {
  Prompt,
  createInterviewEndPrompt,
  createSingleFieldPrompt,
} from '../prompt';
import { QuestionId, type InterviewQuestion } from '../question';
import { type SequentialStrategyData } from './sequential';

export type Strategy<I extends Interview> =
  | {
      type: 'sequential';
      data: SequentialStrategyData<I>;
    }
  | {
      type: 'not-implemented';
      data: SequentialStrategyData<I>;
    };

export const processStrategy = <
  I extends Interview,
  Q extends Extract<keyof I['questions'], QuestionId> = Extract<
    keyof I['questions'],
    QuestionId
  >,
  V extends
    I['questions'][Q]['fact']['initial'] = I['questions'][Q]['fact']['initial'],
>(
  interview: I,
  strategy: Strategy<I>,
  current: InterviewQuestion<I> | null,
  value: V
): Prompt<I> => {
  // TODO: Split the sequential strategy logic into a separate function once
  // its determined how best to encapsulate strategy-specific logic.
  if (strategy.type === 'sequential') {
    if (current === null) {
      const questionId = strategy.data.order[0];
      const question = interview.questions[questionId];
      const value = strategy.data.initial;
      return createSingleFieldPrompt<I>(question.field, {
        id: questionId,
        value,
      });
    }
    const index = strategy.data.order.indexOf(current);
    if (index === -1) {
      throw new Error(`not found: "${current}"`);
    }
    if (index === strategy.data.order.length - 1) {
      return createInterviewEndPrompt('Thanks for completing this interview');
    } else {
      const questionId = strategy.data.order[index + 1];
      const question = interview.questions[questionId];
      return createSingleFieldPrompt<I>(question.field, {
        id: questionId,
        value,
      });
    }
  } else if (strategy.type === 'not-implemented') {
    const questionId = strategy.data.order[1];
    const question = interview.questions[questionId];
    return createSingleFieldPrompt<I>(question.field, {
      id: questionId,
      value,
    });
  } else {
    return strategy satisfies never;
  }
};
