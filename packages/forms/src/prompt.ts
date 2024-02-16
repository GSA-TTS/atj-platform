// For now, a prompt just returns an array of elements. This will likely need

import {
  getRootFormElement,
  type FormConfig,
  type FormElement,
  type FormSession,
} from '..';
import { getFormElementConfig } from './element';

export type TextInputPrompt = {
  type: 'text';
  id: string;
  value: string;
  label: string;
  required: boolean;
  error?: string;
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
  const formElementConfig = getFormElementConfig(config, element.type);
  return formElementConfig.createPrompt(config, session, element);
};

export const isPromptAction = (prompt: Prompt, action: string) => {
  return prompt.actions.find(a => a.type === action);
};
