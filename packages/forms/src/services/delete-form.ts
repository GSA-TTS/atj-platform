import { VoidResult } from '@atj/common';

import {
  deleteFormFromStorage,
  getFormFromStorage,
} from '../context/browser/form-repo.js';
import { type FormServiceContext } from '../context/types.js';

export const deleteForm = (
  ctx: FormServiceContext,
  formId: string
): VoidResult => {
  const form = getFormFromStorage(ctx.storage, formId);
  if (form === null) {
    return {
      success: false,
      error: `form '${formId} does not exist`,
    };
  }
  deleteFormFromStorage(window.localStorage, formId);
  return {
    success: true,
  };
};
