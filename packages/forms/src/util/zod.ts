import * as z from 'zod';

import * as r from '@atj/common';

import { type FormError, type FormErrors, type Pattern } from '..';

export const safeZodParse = <T extends Pattern>(
  schema: z.Schema,
  obj: unknown
): r.Result<T['data'], z.ZodError> => {
  const result = schema.safeParse(obj);
  if (result.success) {
    return r.success(result.data);
  } else {
    return r.failure(result.error);
  }
};

export const safeZodParseToFormError = <T extends Pattern>(
  schema: z.Schema,
  obj: unknown
): r.Result<T['data'], FormError> => {
  const result = schema.safeParse(obj);
  if (result.success) {
    return r.success(result.data);
  } else {
    const error = convertZodErrorToFormError(result.error);
    return r.failure(error);
  }
};

export const safeZodParseFormErrors = <Schema extends z.Schema>(
  schema: Schema,
  obj: unknown
): r.Result<z.infer<Schema>, FormErrors> => {
  const result = safeZodParse(schema, obj);
  if (result.success) {
    return r.success(result.data);
  } else {
    const formErrors = convertZodErrorToFormErrors(result.error);
    return r.failure(formErrors);
  }
};

const convertZodErrorToFormErrors = (zodError: z.ZodError): FormErrors => {
  const formErrors: FormErrors = {};
  zodError.errors.forEach(error => {
    const path = error.path.join('.');
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

const convertZodErrorToFormError = (zodError: z.ZodError): FormError => {
  return {
    type: 'custom',
    message: zodError.errors.map(error => error.message).join(', '),
  };
};
