import { z } from 'zod';

import { en as message } from '@atj/common/src/locales/en/app';

import { ParsePatternConfigData } from '../../pattern';
import { safeZodParseFormErrors } from '../../util/zod';

const configSchema = z.object({
  label: z.string().min(1, message.patterns.input.fieldLabelRequired),
  initial: z.string().optional(),
  required: z.boolean(),
  maxLength: z.coerce.number(),
  page: z.number().int().min(0),
});
export type InputConfigSchema = z.infer<typeof configSchema>;

export const parseConfigData: ParsePatternConfigData<
  InputConfigSchema
> = obj => {
  return safeZodParseFormErrors(configSchema, obj);
};
