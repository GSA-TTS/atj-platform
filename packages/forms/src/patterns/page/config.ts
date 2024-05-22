import { z } from 'zod';

import { type Pattern, type ParsePatternConfigData } from '../../pattern';
import { safeZodParseFormErrors } from '../../util/zod';

const configSchema = z.object({
  title: z.string(),
  patterns: z.array(z.string()),
});

type PageConfigSchema = z.infer<typeof configSchema>;
export type PagePattern = Pattern<PageConfigSchema>;

export const parseConfigData: ParsePatternConfigData<
  PageConfigSchema
> = obj => {
  return safeZodParseFormErrors(configSchema, obj);
};
