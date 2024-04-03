import * as z from 'zod';

import { type Pattern, type PatternConfig } from '../pattern';
import { type ParagraphProps } from '../components';
import { safeZodParse } from '../util/zod';

const configSchema = z.object({
  text: z.string(),
  maxLength: z.coerce.number(),
});
export type ParagraphPattern = Pattern<z.infer<typeof configSchema>>;

export const paragraphConfig: PatternConfig<ParagraphPattern> = {
  displayName: 'Paragraph',
  initial: {
    text: 'Paragraph text...',
    maxLength: 2048,
  },
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
      } as ParagraphProps,
      children: [],
    };
  },
};
