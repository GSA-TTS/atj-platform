import { Result } from '@atj/common';

import { type FormDefinition } from '@atj/forms';
import { getFormFromStorage } from '../context/browser/form-repo';

export const getForm = (
  ctx: { storage: Storage },
  formId: string
): Result<FormDefinition> => {
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
