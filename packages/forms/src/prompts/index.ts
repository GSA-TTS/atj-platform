// For now, a prompt just returns an array of questions. This will likely need

import { FormContext, FormStrategy } from '..';

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

export type Prompt = PromptPart[];

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
      ...formContext.form.strategy.order.map(questionId => {
        const question = formContext.form.questions[questionId];
        return {
          type: 'text' as const,
          id: question.id,
          value: formContext.context.values[questionId],
          label: question.text,
          required: question.required,
        };
      })
    );
  } else if (formContext.form.strategy.type === 'null') {
  } else {
    const _exhaustiveCheck: never = formContext.form.strategy;
  }

  return parts;
};
