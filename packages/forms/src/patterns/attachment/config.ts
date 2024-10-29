import { z } from 'zod';

import { enLocale as message } from '@atj/common';

import { ParsePatternConfigData } from '../../pattern.js';
import { safeZodParseFormErrors } from '../../util/zod.js';

const configSchema = z.object({
  label: z.string().min(1, message.patterns.attachment.fieldLabelRequired),
  initial: z.string().optional(),
  required: z.boolean(),
  maxLength: z.coerce.number(),
});
export type AttachmentConfigSchema = z.infer<typeof configSchema>;

export const parseConfigData: ParsePatternConfigData<
  AttachmentConfigSchema
> = obj => {
  return safeZodParseFormErrors(configSchema, obj);
};
