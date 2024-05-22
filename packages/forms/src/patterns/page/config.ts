import { z } from 'zod';

import { type Pattern, type ParsePatternConfigData } from '../../pattern';
import { safeZodParseFormErrors } from '../../util/zod';

const configSchema = z.object({
  title: z.string(),
  patterns: z.union([
    // Support either an array of strings...
    z.array(z.string()),
    // ...or a comma-separated string.
    // REVISIT: This is messy, and exists only so we can store the data easily
    // as a hidden input in the form. We should probably just store it as JSON.
    z
      .string()
      .transform(value => value.split(',').map(String))
      .pipe(z.string().array()),
  ]),
});

type PageConfigSchema = z.infer<typeof configSchema>;
export type PagePattern = Pattern<PageConfigSchema>;

export const parseConfigData: ParsePatternConfigData<
  PageConfigSchema
> = obj => {
  return safeZodParseFormErrors(configSchema, obj);
};
