import { Result } from '@atj/common';
import { Blueprint } from '../../..';

import { saveFormToStorage } from '../context/browser/form-repo';

export const saveForm = (
  ctx: { storage: Storage },
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
