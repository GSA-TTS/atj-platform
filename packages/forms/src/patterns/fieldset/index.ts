import {
  type Pattern,
  type PatternConfig,
  type PatternId,
} from '../../pattern';
import { parseConfigData } from './config';
import { createPrompt } from './prompt';

export type FieldsetPattern = Pattern<{
  legend?: string;
  patterns: PatternId[];
}>;

export const fieldsetConfig: PatternConfig<FieldsetPattern> = {
  displayName: 'Fieldset',
  iconPath: 'block-icon.svg',
  initial: {
    legend: 'Default Heading',
    patterns: [],
  },
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
  createPrompt,
};
