import * as z from 'zod';

import {
  type Pattern,
  type PatternConfig,
  type PatternId,
  getPattern,
} from '../pattern';
import { createPromptForPattern } from '../components';
import { safeZodParse } from '../util/zod';

export type SequencePattern = Pattern<{
  patterns: PatternId[];
}>;

const sequenceSchema = z.array(z.string());

const configSchema = z.object({
  patterns: z.array(z.string()),
});

export const sequenceConfig: PatternConfig<SequencePattern> = {
  acceptsInput: false,
  initial: {
    patterns: [],
  },
  parseData: (_, obj) => {
    return safeZodParse(sequenceSchema, obj);
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
        type: 'sequence',
      },
      children,
    };
  },
};
