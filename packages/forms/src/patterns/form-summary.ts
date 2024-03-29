import * as z from 'zod';

import { type Pattern, type PatternConfig } from '../pattern';
import { type FormSummaryProps } from '../components';
import { safeZodParse } from '../util/zod';

const configSchema = z.object({
  title: z.string().max(128),
  summary: z.string().max(2024),
});
export type FormSummary = Pattern<z.infer<typeof configSchema>>;

export const formSummaryConfig: PatternConfig<FormSummary> = {
  displayName: 'Form summary',
  acceptsInput: false,
  initial: {
    text: '',
    initial: '',
    required: true,
    maxLength: 128,
  },
  parseData: obj => safeZodParse(configSchema, obj), // make this optional?
  parseConfigData: obj => safeZodParse(configSchema, obj),
  getChildren() {
    return [];
  },
  createPrompt(_, session, pattern, options) {
    return {
      pattern: {
        _patternId: pattern.id,
        type: 'form-summary',
        title: pattern.data.title,
        description: pattern.data.description,
      } as FormSummaryProps,
      children: [],
    };
  },
};
