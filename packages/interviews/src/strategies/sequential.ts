import { IStrategy } from '.';
import type { InterviewSummary, Interview } from '../interview';
import {
  type Prompt,
  createInterviewEndPrompt,
  createSingleFieldPrompt,
} from '../prompt';
import type {
  InterviewFormElement,
  FormElement,
  FormElementId,
} from '../element';

export type SequentialStrategyData<I extends Interview> = {
  initial: InterviewFormElement<I>;
  order: InterviewFormElement<I>[];
};

export type SequentialInterview = {
  summary: InterviewSummary;
  elements: FormElement[];
};

export const createSequentialInterview = (
  opts: SequentialInterview
): Interview => {
  const elements = sequentialFormElementsFromList(opts.elements);
  return {
    summary: opts.summary,
    elements,
    strategy: {
      type: 'sequential',
      data: {
        initial: 'element-1',
        order: Object.keys(elements),
      },
    },
  };
};

const sequentialFormElementsFromList = (elements: FormElement[]) => {
  return Object.fromEntries(
    elements.map((element, index) => {
      const elementId: FormElementId = `element-${index + 1}`;
      return [
        elementId,
        {
          ...element,
          id: elementId,
        },
      ];
    })
  );
};

export const processSequentialStrategy = <
  I extends Interview,
  V extends
    I['elements'][FormElementId]['fact']['initial'] = I['elements'][FormElementId]['fact']['initial'],
>(
  interview: I,
  current: InterviewFormElement<I> | null,
  value: V
): Prompt<I> => {
  const temp = new SequentialStrategy(interview.strategy.data);
  return temp.nextPrompt(interview, current, value);
};

export class SequentialStrategy<I extends Interview> implements IStrategy<I> {
  constructor(private opts: SequentialStrategyData<I>) {}

  nextPrompt<
    I extends Interview,
    Q extends Extract<keyof I['elements'], FormElementId> = Extract<
      keyof I['elements'],
      FormElementId
    >,
    V extends
      I['elements'][Q]['fact']['initial'] = I['elements'][Q]['fact']['initial'],
  >(interview: I, currentFormElementId: Q, value: V) {
    if (currentFormElementId === null) {
      const elementId = this.opts.order[0];
      const element = interview.elements[elementId];
      const value = this.opts.initial;
      return createSingleFieldPrompt<I>(element.field, {
        id: elementId,
        value,
      });
    }
    const index = this.opts.order.indexOf(currentFormElementId);
    if (index === -1) {
      throw new Error(`not found: "${currentFormElementId}"`);
    }
    if (index === this.opts.order.length - 1) {
      return createInterviewEndPrompt('Thanks for completing this interview');
    } else {
      const elementId = this.opts.order[index + 1];
      const element = interview.elements[elementId];
      return createSingleFieldPrompt<I>(element.field, {
        id: elementId,
        value,
      });
    }
  }
}
