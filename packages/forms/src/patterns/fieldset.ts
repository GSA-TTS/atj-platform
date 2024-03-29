import * as z from 'zod';

import {
  type Pattern,
  type PatternConfig,
  type PatternId,
  getPattern,
} from '../pattern';
import { type FieldsetProps, createPromptForPattern } from '../components';
import { safeZodParse } from '../util/zod';

export type FieldsetPattern = Pattern<{
  legend?: string;
  patterns: PatternId[];
}>;

const configSchema = z.object({
  legend: z.string().optional(),
  patterns: z.array(z.string()),
});

export const fieldsetConfig: PatternConfig<FieldsetPattern> = {
  displayName: 'Fieldset',
  initial: {
    patterns: [],
  },
  parseConfigData: obj => safeZodParse(configSchema, obj),
  getChildren(pattern, patterns) {
    return pattern.data.patterns.map(
      (patternId: string) => patterns[patternId]
    );
  },
  createPrompt(config, session, pattern, options) {
    const children = pattern.data.patterns.map((patternId: string) => {
      const childPattern = getPattern(session.form, patternId);
      return createPromptForPattern(config, session, childPattern, options);
    });
    return {
      pattern: {
        _children: children,
        _patternId: pattern.id,
        type: 'fieldset',
        legend: pattern.data.legend,
      } satisfies FieldsetProps,
      children,
    };
  },
};
