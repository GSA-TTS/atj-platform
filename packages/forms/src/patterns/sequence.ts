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

const configSchema = z.object({
  patterns: z.array(z.string()),
});

export const sequenceConfig: PatternConfig<SequencePattern> = {
  displayName: 'Sequence',
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
      props: {
        _patternId: pattern.id,
        type: 'sequence',
      },
      children,
    };
  },
};