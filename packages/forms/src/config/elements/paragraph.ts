import * as z from 'zod';

import { type FormElementConfig } from '..';
import { type FormElement } from '../../element';
import { type Pattern, type ParagraphPattern } from '../../pattern';
import { getFormSessionValue } from '../../session';
import { safeZodParse } from '../../util/zod';

const configSchema = z.object({
  text: z.string(),
  maxLength: z.coerce.number(),
});
export type ParagraphElement = FormElement<z.infer<typeof configSchema>>;

const createSchema = (data: ParagraphElement['data']) =>
  z.string().max(data.maxLength);

export const paragraphConfig: FormElementConfig<ParagraphElement> = {
  acceptsInput: false,
  initial: {
    text: 'normal',
    maxLength: 2048,
  },
  parseData: (elementData, obj) => safeZodParse(createSchema(elementData), obj),
  parseConfigData: obj => safeZodParse(configSchema, obj),
  getChildren() {
    return [];
  },
  createPrompt(_, session, element, options) {
    return {
      pattern: {
        _elementId: element.id,
        type: 'paragraph' as const,
        text: element.data.text,
        style: element.data.style,
      } as Pattern<ParagraphPattern>,
      children: [],
    };
  },
};
