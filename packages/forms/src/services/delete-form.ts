import { VoidResult } from '@atj/common';

import { type FormServiceContext } from '../context/index.js';

export const deleteForm = async (
  ctx: FormServiceContext,
  formId: string
): Promise<VoidResult> => {
  const form = await ctx.repository.getForm(formId);
  if (form === null) {
    return {
      success: false,
      error: `form '${formId} does not exist`,
    };
  }
  ctx.repository.deleteForm(formId);
  return {
    success: true,
  };
};
