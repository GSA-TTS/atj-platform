import { enLocale as message } from '@atj/common';

import { Pattern, type PatternConfig } from '../../pattern.js';

import { parseConfigData, type AttachmentConfigSchema } from './config.js';
import { createPrompt } from './prompt.js';
import { type AttachmentPatternOutput, parseUserInput } from './response.js';

export type AttachmentPattern = Pattern<AttachmentConfigSchema>;

export const attachmentConfig: PatternConfig<
  AttachmentPattern,
  AttachmentPatternOutput
> = {
  displayName: message.patterns.attachment.displayName,
  iconPath: 'shortanswer-icon.svg',
  initial: {
    label: message.patterns.attachment.fieldLabel,
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
