import { type Result } from '@atj/common';

import {
  type FormConfig,
  type PatternId,
  getPattern,
  getPatternConfig,
  validatePattern,
} from '.';
import { type PromptAction, createPrompt, isPromptAction } from './components';
import { type FormSession, updateSession } from './session';

export type PromptResponse = {
  action: PromptAction['type'];
  data: Record<string, string>;
};

export const applyPromptResponse = (
  config: FormConfig,
  session: FormSession,
  response: PromptResponse
): Result<FormSession> => {
  // Get the current prompt for this session.
  const prompt = createPrompt(config, session, { validate: false });
  if (!isPromptAction(prompt, response.action)) {
    return {
      success: false,
      error: 'invalid action',
    };
  }
  const { errors, values } = parsePromptResponse(session, config, response);
  const newSession = updateSession(session, values, errors);

  return {
    success: true,
    data: newSession,
  };
};

const parsePromptResponse = (
  session: FormSession,
  config: FormConfig,
  response: PromptResponse
) => {
  const values: Record<string, any> = {};
  const errors: Record<string, string> = {};
  for (const [patternId, promptValue] of Object.entries(response.data)) {
    const pattern = getPattern(session.form, patternId);
    const patternConfig = getPatternConfig(config, pattern.type);
    const isValidResult = validatePattern(patternConfig, pattern, promptValue);
    if (isValidResult.success) {
      values[patternId] = isValidResult.data;
    } else {
      errors[patternId] = isValidResult.error;
    }
  }
  return { errors, values };
};
