import { Result } from '@atj/common';
import { type Blueprint } from '../../..';

import { getFormFromStorage } from '../context/browser/form-repo';

export const getForm = (
  ctx: { storage: Storage },
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
