import * as z from 'zod';

import { type Pattern, type PatternConfig } from '../pattern';
import { type ParagraphProps } from '../components';
import { safeZodParse } from '../util/zod';

const configSchema = z.object({
  text: z.string(),
  maxLength: z.coerce.number(),
});
export type ParagraphPattern = Pattern<z.infer<typeof configSchema>>;

const createSchema = (data: ParagraphPattern['data']) =>
  z.string().max(data.maxLength);

export const paragraphConfig: PatternConfig<ParagraphPattern> = {
  displayName: 'Paragraph',
  acceptsInput: false,
  initial: {
    text: 'normal',
    maxLength: 2048,
  },
  parseData: (patternData, obj) => safeZodParse(createSchema(patternData), obj),
  parseConfigData: obj => safeZodParse(configSchema, obj),
  getChildren() {
    return [];
  },
  createPrompt(_, session, pattern, options) {
    return {
      pattern: {
        _patternId: pattern.id,
        type: 'paragraph' as const,
        text: pattern.data.text,
        style: pattern.data.style,
      } as ParagraphProps,
      children: [],
    };
  },
};
