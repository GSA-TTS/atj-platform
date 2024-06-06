import { type InputPattern, inputConfig } from '.';
import {
  type CreatePrompt,
  type TextInputProps,
  getFormSessionValue,
  validatePattern,
} from '../..';

export const createPrompt: CreatePrompt<InputPattern> = (
  _,
  session,
  pattern,
  options
) => {
  const extraAttributes: Record<string, any> = {};
  const sessionValue = getFormSessionValue(session, pattern.id);
  if (options.validate) {
    const isValidResult = validatePattern(inputConfig, pattern, sessionValue);
    if (!isValidResult.success) {
      extraAttributes['error'] = isValidResult.error;
    }
  }
  return {
    props: {
      _patternId: pattern.id,
      type: 'input',
      inputId: pattern.id,
      value: sessionValue,
      label: pattern.data.label,
      page: pattern.data.page,
      required: pattern.data.required,
      ...extraAttributes,
    } as TextInputProps,
    children: [],
  };
};
