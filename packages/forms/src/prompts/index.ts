// For now, a prompt just returns an array of elements. This will likely need

import { type FormSession, type FormStrategy } from '..';

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
  if (session.form.strategy.type === 'sequential') {
    parts.push(
      ...session.form.strategy.order.map(elementId => {
        const element = session.form.elements[elementId];
        return {
          type: 'text' as const,
          id: element.id,
          value: session.data.values[elementId],
          label: element.text,
          required: element.required,
        };
      })
    );
  } else if (session.form.strategy.type === 'null') {
  } else {
    const _exhaustiveCheck: never = session.form.strategy;
  }

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
