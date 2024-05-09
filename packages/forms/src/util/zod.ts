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

const convertZodErrorToFormErrors = (zodError: z.ZodError): FormErrors => {
  const formErrors: FormErrors = {};
  zodError.errors.forEach(error => {
    const path = error.path.join('.') || 'root';
    if (error.code === 'too_small' && error.minimum === 1) {
      formErrors[path] = {
        type: 'required',
        message: error.message,
      };
    } else {
      formErrors[path] = {
        type: 'custom',
        message: error.message,
      };
    }
  });
  return formErrors;
};
