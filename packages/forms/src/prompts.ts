// For now, a prompt just returns an array of elements. This will likely need

import {
  getRootFormElement,
  type FormSession,
  type FormElement,
  FormConfig,
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
export const createPrompt = (
  config: FormConfig,
  session: FormSession
): Prompt => {
  const parts: PromptPart[] = [
    {
      type: 'form-summary',
      title: session.form.summary.title,
      description: session.form.summary.description,
    },
  ];
  const root = getRootFormElement(session.form);
  parts.push(...createPromptForElement(config, session, root));
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

export type CreatePrompt<T> = (
  config: FormConfig,
  session: FormSession,
  element: T
) => PromptPart[];

export const createPromptForElement: CreatePrompt<FormElement<any>> = (
  config,
  session,
  element
) => {
  return config.elements[element.type].createPrompt(config, session, element);
};
