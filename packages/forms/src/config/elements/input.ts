import * as z from 'zod';

import { type FormElementConfig } from '..';
import { type FormElement, validateElement } from '../../element';
import { type PromptPart } from '../../prompt';
import { getFormSessionValue } from '../../session';
import { safeZodParse } from '../../util/zod';

export type InputElement = FormElement<{
  text: string;
  initial: string;
  required: boolean;
  maxLength: number;
}>;

const createSchema = (data: InputElement['data']) =>
  z.string().max(data.maxLength);

export const inputConfig: FormElementConfig<InputElement> = {
  acceptsInput: true,
  initial: {
    text: '',
    initial: '',
    required: true,
    maxLength: 128,
  },
  parseData: (elementData, obj) => safeZodParse(createSchema(elementData), obj),
  getChildren() {
    return [];
  },
  createPrompt(_, session, element, options): PromptPart[] {
    const extraAttributes: Record<string, any> = {};
    const sessionValue = getFormSessionValue(session, element.id);
    if (options.validate) {
      const isValidResult = validateElement(inputConfig, element, sessionValue);
      if (!isValidResult.success) {
        extraAttributes['error'] = isValidResult.error;
      }
    }
    return [
      {
        type: 'text' as const,
        id: element.id,
        value: sessionValue,
        label: element.data.text,
        required: element.data.required,
        ...extraAttributes,
      },
    ];
  },
};
