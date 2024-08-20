import { Result } from '@atj/common';
import { type Blueprint } from '../index.js';

import { type FormServiceContext } from '../context/index.js';

export const getForm = (
  ctx: FormServiceContext,
  formId: string
): Result<Blueprint> => {
  const result = ctx.db.getFormFromStorage(ctx.storage, formId);
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
