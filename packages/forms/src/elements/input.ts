import * as z from 'zod';

import { type FormElement, type FormElementConfig } from '../element';
import { type PatternProps, type TextInputPattern } from '../pattern';
import { getFormSessionValue } from '../session';
import { safeZodParse } from '../util/zod';

const configSchema = z.object({
  label: z.string(),
  initial: z.string(),
  required: z.boolean(),
  maxLength: z.coerce.number(),
});
export type InputElement = FormElement<z.infer<typeof configSchema>>;

const createSchema = (data: InputElement['data']) =>
  z.string().max(data.maxLength);

export const inputConfig: FormElementConfig<InputElement> = {
  acceptsInput: true,
  initial: {
    label: '',
    initial: '',
    required: true,
    maxLength: 128,
  },
  parseData: (elementData, obj) => safeZodParse(createSchema(elementData), obj),
  parseConfigData: obj => safeZodParse(configSchema, obj),
  getChildren() {
    return [];
  },
  createPrompt(_, session, element, options) {
    const extraAttributes: Record<string, any> = {};
    const sessionValue = getFormSessionValue(session, element.id);
    if (options.validate) {
      const isValidResult = validateElement(inputConfig, element, sessionValue);
      if (!isValidResult.success) {
        extraAttributes['error'] = isValidResult.error;
      }
    }
    return {
      pattern: {
        _elementId: element.id,
        type: 'input',
        inputId: element.id,
        value: sessionValue,
        label: element.data.label,
        required: element.data.required,
        ...extraAttributes,
      } as PatternProps<TextInputPattern>,
      children: [],
    };
  },
};
