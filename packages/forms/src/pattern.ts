import {
  type FormConfig,
  type FormElement,
  type FormElementId,
  getRootFormElement,
} from '..';
import { getFormElementConfig } from './element';
import { type FormSession, nullSession, sessionIsComplete } from './session';

export type TextInputPattern = {
  type: 'input';
  inputId: string;
  value: string;
  label: string;
  required: boolean;
  error?: string;
};

export type TextPrompt = {
  type: 'text';
  id: string;
  value: string;
  error?: string;
};

export type FormSummaryPattern = {
  type: 'form-summary';
  title: string;
  description: string;
};

export type SubmissionConfirmationPattern = {
  type: 'submission-confirmation';
  table: { label: string; value: string }[];
};

export type ParagraphPattern = {
  type: 'paragraph';
  text: string;
  style: 'indent' | 'normal' | 'heading' | 'subheading';
};

export type FieldsetPattern = {
  type: 'fieldset';
  legend: string;
};

export type Pattern<T = {}> = {
  _elementId: FormElementId;
  _children: PromptPart[];
  type: string;
} & T;

export type SubmitAction = {
  type: 'submit';
  text: 'Submit';
};
export type PromptAction = SubmitAction;

export type PromptPart = {
  pattern: Pattern;
  children: PromptPart[];
};

export type Prompt = {
  actions: PromptAction[];
  parts: PromptPart[];
};

export const createPrompt = (
  config: FormConfig,
  session: FormSession,
  options: { validate: boolean }
): Prompt => {
  if (options.validate && sessionIsComplete(config, session)) {
    return {
      actions: [],
      parts: [
        {
          pattern: {
            _elementId: 'submission-confirmation',
            type: 'submission-confirmation',
            table: Object.entries(session.data.values).map(
              ([elementId, value]) => {
                return {
                  label: session.form.elements[elementId].id,
                  value: value,
                };
              }
            ),
          } as Pattern<SubmissionConfirmationPattern>,
          children: [],
        },
      ],
    };
  }
  const parts: PromptPart[] = [
    {
      pattern: {
        _elementId: 'form-summary',
        type: 'form-summary',
        title: session.form.summary.title,
        description: session.form.summary.description,
      } as Pattern<FormSummaryPattern>,
      children: [],
    },
  ];
  const root = getRootFormElement(session.form);
  parts.push(createPromptForElement(config, session, root, options));
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
  element: T,
  options: { validate: boolean }
) => PromptPart;

export const createPromptForElement: CreatePrompt<FormElement> = (
  config,
  session,
  element,
  options
) => {
  const formElementConfig = getFormElementConfig(config, element.type);
  return formElementConfig.createPrompt(config, session, element, options);
};

export const isPromptAction = (prompt: Prompt, action: string) => {
  return prompt.actions.find(a => a.type === action);
};

export const createNullPrompt = ({
  config,
  element,
}: {
  config: FormConfig;
  element: FormElement;
}): Prompt => {
  const formElementConfig = getFormElementConfig(config, element.type);
  return {
    parts: [
      formElementConfig.createPrompt(config, nullSession, element, {
        validate: false,
      }),
    ],
    actions: [],
  };
};