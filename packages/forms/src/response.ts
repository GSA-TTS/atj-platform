import { type Result } from '@atj/common';

import { type FormConfig, getFormElementConfig } from '.';
import { type PromptAction, createPrompt, isPromptAction } from './prompt';
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
  const prompt = createPrompt(config, session);
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
  for (const [elementId, promptValue] of Object.entries(response.data)) {
    const element = session.form.elements[elementId];
    const formElementConfig = getFormElementConfig(config, element.type);
    const parseResult = formElementConfig.parseData(promptValue);
    values[elementId] = parseResult.data;
    const isValid = formElementConfig.isValid(parseResult.data);
    if (!isValid) {
      errors[elementId] = 'This value is invalid.';
    }
  }
  return { errors, values };
};
