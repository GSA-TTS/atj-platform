import { Result } from '@atj/common';
import { Blueprint } from '../index.js';

import { addFormToStorage } from '../context/browser/form-repo.js';
import { type FormServiceContext } from '../context/types.js';

export const addForm = (
  ctx: FormServiceContext,
  form: Blueprint
): Result<{ timestamp: Date; id: string }> => {
  return addFormToStorage(ctx.storage, form);
};
