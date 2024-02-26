import * as z from 'zod';

import { type FormElementConfig } from '..';
import { type FormElement, validateElement } from '../../element';
import { type Pattern, type TextInputPattern } from '../../pattern';
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
    instructions: '',
    required: true,
    maxLength: 128,
  },
  parseData: (elementData, obj) => safeZodParse(createSchema(elementData), obj),
  getChildren() {
    return [];
  },
  createPrompt(_, session, element, options): Pattern[] {
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
        _elementId: element.id,
        type: 'input',
        inputId: element.id,
        value: sessionValue,
        label: element.data.text,
        instructions: element.data.instructions,
        required: element.data.required,
        ...extraAttributes,
      } as Pattern<TextInputPattern>,
    ];
  },
};
