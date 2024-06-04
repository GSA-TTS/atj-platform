import { type PatternConfig } from '../../pattern';

import { type PagePattern, parseConfigData } from './config';
import { createPrompt } from './prompt';

export const pageConfig: PatternConfig<PagePattern> = {
  displayName: 'Page',
  iconPath: 'block-icon.svg',
  initial: {
    title: 'Untitled Page',
    patterns: [],
  },
  createPrompt,
  parseConfigData,
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
};
