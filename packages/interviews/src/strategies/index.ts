import { type Interview } from '../interview';
import { type Prompt } from '../prompt';
import { type QuestionId, type InterviewQuestion } from '../question';
import {
  processSequentialStrategy,
  type SequentialStrategyData,
} from './sequential';

export type Strategy<I extends Interview> =
  | {
      type: 'sequential';
      data: SequentialStrategyData<I>;
    }
  | {
      type: 'not-implemented';
      data: SequentialStrategyData<I>;
    };

export interface IStrategy<I extends Interview> {
  nextPrompt<
    I extends Interview,
    Q extends Extract<keyof I['questions'], QuestionId> = Extract<
      keyof I['questions'],
      QuestionId
    >,
    V extends
      I['questions'][Q]['fact']['initial'] = I['questions'][Q]['fact']['initial'],
  >(
    interview: I,
    currentQuestionId: InterviewQuestion<I> | null,
    value: V
  ): Prompt<I>;
}

export const processStrategy = <
  I extends Interview,
  V extends
    I['questions'][QuestionId]['fact']['initial'] = I['questions'][QuestionId]['fact']['initial'],
>(
  interview: I,
  current: InterviewQuestion<I> | null,
  value: V
): Prompt<I> => {
  if (interview.strategy.type === 'sequential') {
    return processSequentialStrategy(interview, current, value);
  } else if (interview.strategy.type === 'not-implemented') {
    throw new Error('unimplemented sample strategy');
  } else {
    return interview.strategy satisfies never;
  }
};
