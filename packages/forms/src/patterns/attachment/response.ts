import { z } from 'zod';
import { ParseUserInput } from '../../pattern.js';
import { safeZodParseToFormError } from '../../util/zod.js';
import { type AttachmentPattern } from './index.js';

const createSchema = (data: AttachmentPattern['data']) => {
  const schema = z
    .instanceof(FileList)
    .refine(files => files instanceof FileList, {
      message: 'The input must be a file',
    });

  if (data.required) {
    return schema.refine(files => files.length >= 1, {
      message: 'At least one file is required',
    });
  }

  return schema;
};

export type AttachmentPatternOutput = z.infer<ReturnType<typeof createSchema>>;

export const parseUserInput: ParseUserInput<
  AttachmentPattern,
  AttachmentPatternOutput
> = (pattern, obj) => {
  console.group('parseUserInput');
  console.group('pattern');
  console.log(pattern);
  console.groupEnd();
  console.group('obj');
  console.log(obj);
  console.groupEnd();
  console.groupEnd();
  return safeZodParseToFormError(createSchema(pattern['data']), obj);
};
