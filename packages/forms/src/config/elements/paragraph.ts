import * as z from 'zod';

import { type FormElementConfig } from '..';
import { type FormElement, validateElement } from '../../element';
import { type Pattern, type ParagraphPattern } from '../../pattern';
import { getFormSessionValue } from '../../session';
import { safeZodParse } from '../../util/zod';

const configSchema = z.object({
  label: z.string(),
  initial: z.string(),
  required: z.boolean(),
  maxLength: z.coerce.number(),
});
export type ParagraphElement = FormElement<z.infer<typeof configSchema>>;

const createSchema = (data: ParagraphElement['data']) =>
  z.string().max(data.maxLength);

export const paragraphConfig: FormElementConfig<ParagraphElement> = {
  acceptsInput: false,
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
    // const extraAttributes: Record<string, any> = {};
    // const sessionValue = getFormSessionValue(session, element.id);
    // if (options.validate) {
    //   const isValidResult = validateElement(paragraphConfig, element, sessionValue);
    //   if (!isValidResult.success) {
    //     extraAttributes['error'] = isValidResult.error;
    //   }
    // }
    return {
      pattern: {
        _elementId: element.id,
        type: 'paragraph',
        text: element.data.text,
        style: element.data.style,
      } as Pattern<ParagraphPattern>,
      children: [],
    };
  },
};
