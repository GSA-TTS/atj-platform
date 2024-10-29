import { z } from 'zod';

import { ParseUserInput } from '../../pattern.js';
import { safeZodParseToFormError } from '../../util/zod.js';

import { type AttachmentPattern } from './index.js';

const createSchema = (data: AttachmentPattern['data']) => {
  const schema = z.string().max(data.maxLength);
  if (!data.required) {
    return schema;
  }
  return schema.min(1, { message: 'This field is required' });
};

export type AttachmentPatternOutput = z.infer<ReturnType<typeof createSchema>>;

export const parseUserInput: ParseUserInput<
  AttachmentPattern,
  AttachmentPatternOutput
> = (pattern, obj) => {
  return safeZodParseToFormError(createSchema(pattern['data']), obj);
};
