import { type Result } from '@atj/common';

import {
  type FormConfig,
  type FormElementId,
  getFormElement,
  getFormElementConfig,
  validateElement,
} from '.';
import { type PromptAction, createPrompt, isPromptAction } from './prompt';
import { type FormSession, updateSession } from './session';
import { isValid } from 'zod';

export type PromptResponse = {
  action: PromptAction['type'];
  data: Record<string, string>;
};

export const applyPromptResponse = (
  config: FormConfig,
  session: FormSession,
  response: PromptResponse,
  options: { validate: true }
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

const parseElementValue = (
  config: FormConfig,
  session: FormSession,
  elementId: FormElementId,
  promptValue: string
) => {
  const element = session.form.elements[elementId];
  const formElementConfig = getFormElementConfig(config, element.type);
  return formElementConfig.parseData(element, promptValue);
};

const parsePromptResponse = (
  session: FormSession,
  config: FormConfig,
  response: PromptResponse
) => {
  const values: Record<string, any> = {};
  const errors: Record<string, string> = {};
  for (const [elementId, promptValue] of Object.entries(response.data)) {
    const element = getFormElement(session.form, elementId);
    const elementConfig = getFormElementConfig(config, element.type);
    const isValidResult = validateElement(elementConfig, element, promptValue);
    if (isValidResult.success) {
      values[elementId] = isValidResult.data;
    } else {
      errors[elementId] = isValidResult.error;
    }
  }
  return { errors, values };
};
