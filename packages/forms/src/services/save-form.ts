import { Result } from '@atj/common';
import { Blueprint } from '../index.js';

import { type FormServiceContext } from '../context/index.js';

export const saveForm = async (
  ctx: FormServiceContext,
  formId: string,
  form: Blueprint
): Promise<Result<{ timestamp: Date }>> => {
  const result = await ctx.repository.saveForm(formId, form);
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
