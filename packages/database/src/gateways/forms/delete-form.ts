import { type VoidResult, failure } from '@atj/common';

import { type DatabaseContext } from '../../context/types';

export const deleteForm = async (
  ctx: DatabaseContext,
  formId: string
): Promise<VoidResult> => {
  const db = await ctx.getKysely();

  const deleteResult = await db
    .deleteFrom('forms')
    .where('id', '=', formId)
    .execute();

  if (!deleteResult[0].numDeletedRows) {
    return failure('form not found');
  }

  return { success: true };
};
