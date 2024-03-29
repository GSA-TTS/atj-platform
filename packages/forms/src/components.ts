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
  legend?: string;
}>;

export type PatternProps<T = {}> = {
  _patternId: PatternId;
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
            _patternId: 'submission-confirmation',
            type: 'submission-confirmation',
            table: Object.entries(session.data.values)
              .filter(([patternId, value]) => {
                const elemConfig = getPatternConfig(
                  config,
                  session.form.patterns[patternId].type
                );
                return !!elemConfig.parseData;
              })
              .map(([patternId, value]) => {
                return {
                  label: session.form.patterns[patternId].data.label,
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
        _patternId: 'form-summary',
        type: 'form-summary',
        title: session.form.summary.title,
        description: session.form.summary.description,
      } as FormSummaryProps,
      children: [],
    },
  ];
  const root = getRootPattern(session.form);
  parts.push(createPromptForPattern(config, session, root, options));
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
  pattern: T,
  options: { validate: boolean }
) => PromptPart;

export const createPromptForPattern: CreatePrompt<Pattern> = (
  config,
  session,
  pattern,
  options
) => {
  const patternConfig = getPatternConfig(config, pattern.type);
  return patternConfig.createPrompt(config, session, pattern, options);
};

export const isPromptAction = (prompt: Prompt, action: string) => {
  return prompt.actions.find(a => a.type === action);
};

export const createNullPrompt = ({
  config,
  pattern,
}: {
  config: FormConfig;
  pattern: Pattern;
}): Prompt => {
  const formPatternConfig = getPatternConfig(config, pattern.type);
  return {
    parts: [
      formPatternConfig.createPrompt(config, nullSession, pattern, {
        validate: false,
      }),
    ],
    actions: [],
  };
};
