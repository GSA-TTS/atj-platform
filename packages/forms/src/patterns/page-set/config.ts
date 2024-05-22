import { z } from 'zod';

import { type Pattern, type ParsePatternConfigData } from '../../pattern';
import { safeZodParseFormErrors } from '../../util/zod';

const configSchema = z.object({
  pages: z.array(z.string()),
});

type PageSetConfigSchema = z.infer<typeof configSchema>;
export type PageSetPattern = Pattern<PageSetConfigSchema>;

export const parseConfigData: ParsePatternConfigData<
  PageSetConfigSchema
> = obj => {
  return safeZodParseFormErrors(configSchema, obj);
};
