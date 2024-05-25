import { z } from 'zod';

import { ParseUserInput } from '../../pattern';
import { safeZodParseToFormError } from '../../util/zod';

import { type InputPattern } from '.';

const createSchema = (data: InputPattern['data']) => {
  const schema = z.string().max(data.maxLength);
  if (!data.required) {
    return schema;
  }
  return schema.min(1, { message: 'This field is required' });
};

export type InputPatternOutput = z.infer<ReturnType<typeof createSchema>>;

export const parseUserInput: ParseUserInput<
  InputPattern,
  InputPatternOutput
> = (pattern, obj) => {
  return safeZodParseToFormError(createSchema(pattern['data']), obj);
};
