import { Result } from '@atj/common';
import { type Blueprint } from '../index.js';

import { getFormFromStorage } from '../context/browser/form-repo.js';
import { type FormServiceContext } from '../context/types.js';

export const getForm = (
  ctx: FormServiceContext,
  formId: string
): Result<Blueprint> => {
  const result = getFormFromStorage(ctx.storage, formId);
  if (result === null) {
    return {
      success: false,
      error: 'not found',
    };
  }
  return {
    success: true,
    data: result,
  };
};
