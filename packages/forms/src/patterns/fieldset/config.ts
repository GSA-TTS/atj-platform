import { z } from 'zod';

import { safeZodParseFormErrors } from '../../util/zod';
import { ParsePatternConfigData } from '../../pattern';

const configSchema = z.object({
  legend: z.string().min(1),
  patterns: z.array(z.string()).default([]),
});
export type FieldsetConfigSchema = z.infer<typeof configSchema>;

export const parseConfigData: ParsePatternConfigData<
  FieldsetConfigSchema
> = obj => {
  return safeZodParseFormErrors(configSchema, obj);
};
