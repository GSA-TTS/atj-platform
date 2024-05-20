import * as z from 'zod';

import {
  type Pattern,
  type PatternConfig,
  type PatternId,
  getPattern,
} from '../pattern';
import { type PageProps, createPromptForPattern } from '../components';
import { safeZodParseFormErrors } from '../util/zod';

export type PagePattern = Pattern<{
  title: string;
  patterns: PatternId[];
}>;

const configSchema = z.object({
  title: z.string(),
  patterns: z.array(z.string()),
});

export const pageConfig: PatternConfig<PagePattern> = {
  displayName: 'Page',
  initial: {
    title: 'Untitled Page',
    patterns: [],
  },
  parseConfigData: obj => safeZodParseFormErrors(configSchema, obj),
  getChildren(pattern, patterns) {
    return pattern.data.patterns.map(
      (patternId: string) => patterns[patternId]
    );
  },
  removeChildPattern(pattern, patternId) {
    const newPatterns = pattern.data.patterns.filter(
      (id: string) => patternId !== id
    );
    if (newPatterns.length === pattern.data.patterns.length) {
      return pattern;
    }
    return {
      ...pattern,
      data: {
        ...pattern.data,
        patterns: newPatterns,
      },
    };
  },
  createPrompt(config, session, pattern, options) {
    const children = pattern.data.patterns.map((patternId: string) => {
      const childPattern = getPattern(session.form, patternId);
      return createPromptForPattern(config, session, childPattern, options);
    });
    return {
      props: {
        _patternId: pattern.id,
        type: 'page',
        title: pattern.data.title,
      } satisfies PageProps,
      children,
    };
  },
};
