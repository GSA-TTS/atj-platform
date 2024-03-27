import { getRootPattern } from '..';
import {
  type FormConfig,
  type Pattern,
  type PatternId,
  getPatternConfig,
} from './pattern';
import { type FormSession, nullSession, sessionIsComplete } from './session';

export type TextInputProps = PatternProps<{
  type: 'input';
  inputId: string;
  value: string;
  label: string;
  required: boolean;
  error?: string;
}>;

export type FormSummaryProps = PatternProps<{
  type: 'form-summary';
  title: string;
  description: string;
}>;

export type SubmissionConfirmationProps = PatternProps<{
  type: 'submission-confirmation';
  table: { label: string; value: string }[];
}>;

export type ParagraphProps = PatternProps<{
  type: 'paragraph';
  text: string;
  style: 'indent' | 'normal' | 'heading' | 'subheading';
}>;

export type FieldsetProps = PatternProps<{
  type: 'fieldset';
  legend: string;
}>;

export type PatternProps<T = {}> = {
  _elementId: PatternId;
  _children: PromptPart[];
  type: string;
} & T;

export type SubmitAction = {
  type: 'submit';
  text: 'Submit';
};
export type PromptAction = SubmitAction;

export type PromptPart = {
  pattern: PatternProps;
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
            table: Object.entries(session.data.values)
              .filter(([elementId, value]) => {
                const elemConfig = getPatternConfig(
                  config,
                  session.form.elements[elementId].type
                );
                return elemConfig.acceptsInput;
              })
              .map(([elementId, value]) => {
                return {
                  label: session.form.elements[elementId].data.label,
                  value: value,
                };
              }),
          } as SubmissionConfirmationProps,
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
      } as FormSummaryProps,
      children: [],
    },
  ];
  const root = getRootPattern(session.form);
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

export const createPromptForElement: CreatePrompt<Pattern> = (
  config,
  session,
  element,
  options
) => {
  const formElementConfig = getPatternConfig(config, element.type);
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
  element: Pattern;
}): Prompt => {
  const formElementConfig = getPatternConfig(config, element.type);
  return {
    parts: [
      formElementConfig.createPrompt(config, nullSession, element, {
        validate: false,
      }),
    ],
    actions: [],
  };
};
