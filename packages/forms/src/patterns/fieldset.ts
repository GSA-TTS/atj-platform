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

const FieldsetSchema = z.array(z.string());

const configSchema = z.object({
  legend: z.string().optional(),
  patterns: z.array(z.string()),
});

export const fieldsetConfig: PatternConfig<FieldsetPattern> = {
  acceptsInput: false,
  initial: {
    patterns: [],
  },
  parseData: (_, obj) => {
    return safeZodParse(FieldsetSchema, obj);
  },
  parseConfigData: obj => safeZodParse(configSchema, obj),
  getChildren(pattern, patterns) {
    return pattern.data.patterns.map(
      (patternId: string) => patterns[patternId]
    );
  },
  createPrompt(config, session, pattern, options) {
    const children = pattern.data.patterns.map((patternId: string) => {
      const pattern = getPattern(session.form, patternId);
      return createPromptForPattern(config, session, pattern, options);
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
