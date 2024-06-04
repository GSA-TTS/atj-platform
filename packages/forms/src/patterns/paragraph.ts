import * as z from 'zod';

import { type Pattern, type PatternConfig } from '../pattern';
import { type ParagraphProps } from '../components';
import { safeZodParseFormErrors } from '../util/zod';

const configSchema = z.object({
  text: z.string().min(1),
  fontTag: z.string().min(1),
  fontModifiers: z.array(z.string()),
});
export type ParagraphPattern = Pattern<z.infer<typeof configSchema>>;

export const paragraphConfig: PatternConfig<ParagraphPattern> = {
  displayName: 'Long answer',
  iconPath: 'longanswer-icon.svg',
  initial: {
    text: 'Paragraph text...',
    fontTag: 'p',
    fontModifiers: [],
  },
  parseConfigData: obj => safeZodParseFormErrors(configSchema, obj),
  getChildren() {
    return [];
  },
  createPrompt(_, session, pattern, options) {
    return {
      props: {
        _patternId: pattern.id,
        type: 'paragraph' as const,
        text: pattern.data.text,
        fontTag: pattern.data.fontTag,
        fontModifiers: pattern.data.fontModifiers,
        style: 'normal',
      } as ParagraphProps,
      children: [],
    };
  },
};
