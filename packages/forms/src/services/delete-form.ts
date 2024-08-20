import { VoidResult } from '@atj/common';

import { type FormServiceContext } from '../context/index.js';

export const deleteForm = (
  ctx: FormServiceContext,
  formId: string
): VoidResult => {
  const form = ctx.db.getFormFromStorage(ctx.storage, formId);
  if (form === null) {
    return {
      success: false,
      error: `form '${formId} does not exist`,
    };
  }
  ctx.db.deleteFormFromStorage(window.localStorage, formId);
  return {
    success: true,
  };
};
