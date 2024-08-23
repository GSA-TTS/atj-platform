import { type Result } from '@atj/common';

import { type Blueprint } from '../index.js';
import { type FormServiceContext } from '../context/index.js';

export const getForm = async (
  ctx: FormServiceContext,
  formId: string
): Promise<Result<Blueprint>> => {
  const result = await ctx.repository.getForm(formId);
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
