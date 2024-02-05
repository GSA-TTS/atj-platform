import { type Interview } from '../interview';
import { type Prompt } from '../prompt';
import { type FormElementId, type InterviewFormElement } from '../element';
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
    Q extends Extract<keyof I['elements'], FormElementId> = Extract<
      keyof I['elements'],
      FormElementId
    >,
    V extends
      I['elements'][Q]['fact']['initial'] = I['elements'][Q]['fact']['initial'],
  >(
    interview: I,
    currentFormElementId: InterviewFormElement<I> | null,
    value: V
  ): Prompt<I>;
}

export const processStrategy = <
  I extends Interview,
  V extends
    I['elements'][FormElementId]['fact']['initial'] = I['elements'][FormElementId]['fact']['initial'],
>(
  interview: I,
  current: InterviewFormElement<I> | null,
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
