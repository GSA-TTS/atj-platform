import { validAnswer } from '../answer';
import { Interview } from '../interview';
import { FormContext } from '../interview-context';
import { Button } from '../prompt';
import { FormElement, FormElementId } from '../element';
import { type IStrategy, processStrategy } from '../strategies';

export const handleSubmit = <I extends Interview, C extends FormContext<I>>(
  context: C,
  strategy: IStrategy<I>,
  formData: FormData
): C => {
  const submitButton = getSubmitButton(context.prompt.buttons, formData);
  //const nextContext = applyPrompt(context.prompt, formData);
  //const nextContext = answerFormElementById(context, action.elementId, formData);
  if (submitButton === 'next') {
    return {
      prompt: strategy.nextPrompt(context.interview, prompt),
    };
  }
  return context;
};

const answerFormElementById = <
  I extends Interview,
  C extends FormContext<I>,
  Q extends Extract<keyof I['elements'], FormElementId>,
  V extends I['elements'][Q]['fact']['initial'],
>(
  context: C,
  elementId: Q,
  formData: FormData
): FormContext<I> => {
  const element = context.interview.elements[elementId];
  if (element === undefined) {
    return {
      ...context,
      error: `invalid element ID: ${elementId}`,
    };
  }

  const value = getFieldValue(formData, element);
  if (!validAnswer(element, formData.get('elementId'))) {
    return {
      ...context,
      error: `invalid answer: ${value}`,
    };
  }

  return {
    interview: context.interview,
    prompt: processStrategy(context.interview, elementId, value),
    answers: {
      ...context.answers,
      [elementId]: value,
    },
  };
};

const answerFormElement = <I extends Interview, C extends FormContext<I>>(
  context: C,
  element: FormElement,
  formData: FormData
): FormContext<I> => {
  const value = getFieldValue(formData, element);
  if (!validAnswer(element, formData.get('elementId'))) {
    return {
      ...context,
      error: `invalid answer: ${value}`,
    };
  }

  return {
    interview: context.interview,
    prompt: processStrategy(context.interview, element.field.id, value),
    answers: {
      ...context.answers,
      [elementId]: value,
    },
  };
};

const getSubmitButton = <I extends Interview>(
  buttons: Button[],
  formData: FormData
) => {
  const matches = buttons
    .filter(button => formData.has(button.name))
    .map(button => formData.get(button.name));
  if (matches.length === 0) {
    throw new Error('no submitter provided');
  }
  if (matches.length > 1) {
    throw new Error(`more than one submitter: ${matches.join(', ')}`);
  }
  return matches[0];
};

const getFieldValue = (formData: FormData, element: FormElement) => {
  const field = formData.get(element.field.name);
  if (field === null) {
    throw new Error(`field not found: ${element.field.name}`);
  }
  // For expediency, hardcode some checks for now.
  if (element.fact.type === 'boolean') {
    return field.toString() === '1';
  } else if (element.fact.type === 'text') {
    return field.toString();
  }
};
