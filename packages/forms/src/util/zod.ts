import * as z from 'zod';

import { type Result } from '@atj/common';

import { type FormErrors, type Pattern } from '..';

export const safeZodParse = <T extends Pattern>(
  schema: z.Schema,
  obj: unknown
): Result<T['data'], FormErrors> => {
  const result = schema.safeParse(obj);
  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  } else {
    return {
      success: false,
      error: convertZodErrorToFormErrors(result.error),
    };
  }
};

function convertZodErrorToFormErrors(zodError: z.ZodError): FormErrors {
  const formErrors: FormErrors = {};
  zodError.errors.forEach(error => {
    const fieldName = error.path[0] || 'unknown';
    switch (error.code) {
      default:
        formErrors[fieldName] = {
          type: 'custom',
          message: error.message,
        };
        break;
    }
  });
  return formErrors;
}
