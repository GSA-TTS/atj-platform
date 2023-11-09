import { type Interview } from '../interview';
import { InterviewEnd } from '../interview-context';
import { type InterviewQuestion } from '../question';
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

export const processStrategy = <I extends Interview>(
  strategy: Strategy<I>,
  current: InterviewQuestion<I> | null
) => {
  // TODO: Split the sequential strategy logic into a separate function once
  // its determined how best to encapsulate strategy-specific logic.
  if (strategy.type === 'sequential') {
    if (current === null) {
      return strategy.data.order[0];
    }
    const index = strategy.data.order.indexOf(current);
    if (index === -1) {
      throw new Error(`not found: "${current}"`);
    }
    if (index === strategy.data.order.length - 1) {
      return InterviewEnd;
    } else {
      return strategy.data.order[index + 1];
    }
  } else if (strategy.type === 'not-implemented') {
    return strategy.data.order[1];
  } else {
    return strategy satisfies never;
  }
};
