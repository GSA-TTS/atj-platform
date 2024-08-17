import { enLocale as message } from '@atj/common';

import { Pattern, type PatternConfig } from '../../pattern.js';

import { parseConfigData, type InputConfigSchema } from './config.js';
import { createPrompt } from './prompt.js';
import { type InputPatternOutput, parseUserInput } from './response.js';

export type InputPattern = Pattern<InputConfigSchema>;

export const inputConfig: PatternConfig<InputPattern, InputPatternOutput> = {
  displayName: message.patterns.input.displayName,
  iconPath: 'shortanswer-icon.svg',
  initial: {
    label: message.patterns.input.fieldLabel,
    initial: '',
    required: true,
    maxLength: 128,
  },
  parseUserInput,
  parseConfigData,
  getChildren() {
    return [];
  },
  createPrompt,
};
