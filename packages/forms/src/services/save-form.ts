import { Result } from '@atj/common';
import { Blueprint } from '../index.js';

import { saveFormToStorage } from '../context/browser/form-repo.js';
import { type FormServiceContext } from '../context/types.js';

export const saveForm = (
  ctx: FormServiceContext,
  formId: string,
  form: Blueprint
): Result<{ timestamp: Date }> => {
  const result = saveFormToStorage(ctx.storage, formId, form);
  if (result.success === false) {
    return {
      success: false,
      error: result.error,
    };
  }
  return {
    success: true,
    data: {
      timestamp: new Date(),
    },
  };
};
