import { en as message } from '@atj/common/src/locales/en/app';

import { Pattern, type PatternConfig } from '../../pattern';

import { parseConfigData, type InputConfigSchema } from './config';
import { createPrompt } from './prompt';
import { type InputPatternOutput, parseUserInput } from './response';

export type InputPattern = Pattern<InputConfigSchema>;

export const inputConfig: PatternConfig<InputPattern, InputPatternOutput> = {
  displayName: message.patterns.input.displayName,
  iconPath: 'shortanswer-icon.svg',
  initial: {
    label: message.patterns.input.fieldLabel,
    initial: '',
    required: true,
    maxLength: 128,
    page: 0,
  },
  parseUserInput,
  parseConfigData,
  getChildren() {
    return [];
  },
  createPrompt,
};
