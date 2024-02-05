// For now, a prompt just returns an array of elements. This will likely need

import { type FormContext, type FormStrategy } from '..';

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
  formContext: FormContext<T>
): Prompt => {
  const parts: PromptPart[] = [
    {
      type: 'form-summary',
      title: formContext.form.summary.title,
      description: formContext.form.summary.description,
    },
  ];
  if (formContext.form.strategy.type === 'sequential') {
    parts.push(
      ...formContext.form.strategy.order.map(elementId => {
        const element = formContext.form.elements[elementId];
        return {
          type: 'text' as const,
          id: element.id,
          value: formContext.context.values[elementId],
          label: element.text,
          required: element.required,
        };
      })
    );
  } else if (formContext.form.strategy.type === 'null') {
  } else {
    const _exhaustiveCheck: never = formContext.form.strategy;
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
