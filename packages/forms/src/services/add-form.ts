import { Result } from '@atj/common';
import { Blueprint } from '../index.js';

import { type FormServiceContext } from '../context/index.js';

export const addForm = (
  ctx: FormServiceContext,
  form: Blueprint
): Result<{ timestamp: Date; id: string }> => {
  return ctx.db.addFormToStorage(ctx.storage, form);
};
