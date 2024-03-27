import * as z from 'zod';

import { type Pattern, type PatternConfig } from '../pattern';
import { type ParagraphProps } from '../components';
import { safeZodParse } from '../util/zod';

const configSchema = z.object({
  text: z.string(),
  maxLength: z.coerce.number(),
});
export type ParagraphElement = Pattern<z.infer<typeof configSchema>>;

const createSchema = (data: ParagraphElement['data']) =>
  z.string().max(data.maxLength);

export const paragraphConfig: PatternConfig<ParagraphElement> = {
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
      } as ParagraphProps,
      children: [],
    };
  },
};
