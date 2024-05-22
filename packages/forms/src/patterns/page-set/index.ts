import { type PatternConfig } from '../../pattern';

import { type PageSetPattern, parseConfigData } from './config';
import { createPrompt } from './prompt';

export const pageSetConfig: PatternConfig<PageSetPattern> = {
  displayName: 'Page set',
  initial: {
    pages: [],
  },
  createPrompt,
  parseConfigData,
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
};
