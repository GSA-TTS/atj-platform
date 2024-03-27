import * as z from 'zod';

import { type Result } from '@atj/common';

import { type Pattern } from '..';

export const safeZodParse = <T extends Pattern>(
  schema: z.Schema,
  obj: string
): Result<T> => {
  const result = schema.safeParse(obj);
  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  } else {
    return {
      success: false,
      error: result.error.message,
    };
  }
};
