import * as z from 'zod';

import { type Pattern, type PatternConfig } from '../pattern';
import { type ParagraphProps } from '../components';
import { safeZodParseFormErrors } from '../util/zod';

const configSchema = z.object({
  text: z.string().min(1),
});
export type ParagraphPattern = Pattern<z.infer<typeof configSchema>>;

export const paragraphConfig: PatternConfig<ParagraphPattern> = {
  displayName: 'Paragraph',
  iconPath: 'longanswer-icon.svg',
  initial: {
    text: 'Paragraph text...',
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
      } as ParagraphProps,
      children: [],
    };
  },
};
