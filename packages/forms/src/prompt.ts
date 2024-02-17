// For now, a prompt just returns an array of elements. This will likely need

import {
  type FormConfig,
  type FormElement,
  type FormSession,
  getRootFormElement,
} from '..';
import { getFormElementConfig } from './element';

import { sessionIsComplete } from './session';

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

export type SubmissionConfirmationPrompt = {
  type: 'submission-confirmation';
  table: { label: string; value: string }[];
};

export type PromptPart =
  | FormSummaryPrompt
  | TextInputPrompt
  | SubmissionConfirmationPrompt;

export type SubmitAction = {
  type: 'submit';
  text: 'Submit';
};
export type PromptAction = SubmitAction;

export type Prompt = {
  actions: PromptAction[];
  parts: PromptPart[];
};

export const createPrompt = (
  config: FormConfig,
  session: FormSession
): Prompt => {
  if (sessionIsComplete(config, session)) {
    return {
      actions: [],
      parts: [
        {
          type: 'submission-confirmation',
          table: Object.entries(session.data.values).map(
            ([elementId, value]) => {
              return {
                label: session.form.elements[elementId].id,
                value: value,
              };
            }
          ),
        },
      ],
    };
  }
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
