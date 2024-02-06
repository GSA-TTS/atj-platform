// For now, a prompt just returns an array of elements. This will likely need

import {
  getRootFormElement,
  type FormSession,
  type FormStrategy,
  FormElement,
} from '..';

export type TextInputPrompt = {
  type: 'text';
  id: string;
  value: string;
  label: string;
  required: boolean;
};

export type FormSummaryPrompt = {
  type: 'form-summary';
  title: string;
  description: string;
};

export type PromptPart = FormSummaryPrompt | TextInputPrompt;

export type SubmitAction = {
  type: 'submit';
  text: 'Submit';
};
export type PromptAction = SubmitAction;

export type Prompt = {
  actions: PromptAction[];
  parts: PromptPart[];
};

// to be filled out to support more complicated display formats.
export const createPrompt = <T extends FormStrategy>(
  session: FormSession<T>
): Prompt => {
  const parts: PromptPart[] = [
    {
      type: 'form-summary',
      title: session.form.summary.title,
      description: session.form.summary.description,
    },
  ];
  const root = getRootFormElement(session.form);
  parts.push(...createPromptForElement(session, root));
  return {
    actions: [
      {
        type: 'submit',
        text: 'Submit',
      },
    ],
    parts,
  };
};

const createPromptForElement = <T extends FormStrategy>(
  session: FormSession<T>,
  element: FormElement
): PromptPart[] => {
  if (element.type === 'input') {
    return [
      {
        type: 'text' as const,
        id: element.id,
        value: session.data.values[element.id],
        label: element.text,
        required: element.required,
      },
    ];
  } else if (element.type === 'sequence') {
    return element.elements.flatMap(elementId => {
      const element = session.form.elements[elementId];
      return createPromptForElement(session, element);
    });
  } else {
    const _exhaustiveCheck: never = element;
    return _exhaustiveCheck;
  }
};
