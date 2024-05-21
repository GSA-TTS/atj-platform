import * as z from 'zod';

import {
  type Pattern,
  type PatternConfig,
  type PatternId,
  getPattern,
} from '../pattern';
import { createPromptForPattern, PageSetProps } from '../components';
import { safeZodParseFormErrors } from '../util/zod';
import { PagePattern } from './page';

export type PageSetPattern = Pattern<{
  pages: PatternId[];
}>;

const configSchema = z.object({
  pages: z.array(z.string()),
});

export const pageSetConfig: PatternConfig<PageSetPattern> = {
  displayName: 'Page set',
  initial: {
    pages: [],
  },
  parseConfigData: obj => safeZodParseFormErrors(configSchema, obj),
  getChildren(pattern, patterns) {
    return pattern.data.pages.map((patternId: string) => patterns[patternId]);
  },
  removeChildPattern(pattern, patternId) {
    const newPatterns = pattern.data.pages.filter(
      (id: string) => patternId !== id
    );
    if (newPatterns.length === pattern.data.pages.length) {
      return pattern;
    }
    return {
      ...pattern,
      data: {
        ...pattern.data,
        pages: newPatterns,
      },
    };
  },
  createPrompt(config, session, pattern, options) {
    const children = pattern.data.pages.map((patternId: string) => {
      const childPattern = getPattern(session.form, patternId);
      return createPromptForPattern(config, session, childPattern, options);
    });
    return {
      props: {
        _patternId: pattern.id,
        type: 'page-set',
        pages: pattern.data.pages.map((patternId: string) => {
          const childPattern = getPattern(
            session.form,
            patternId
          ) as PagePattern;
          if (childPattern.type !== 'page') {
            throw new Error('Page set children must be pages');
          }
          return {
            title: childPattern.data.title,
            active: false,
          };
        }),
      } satisfies PageSetProps,
      children,
    };
  },
};
