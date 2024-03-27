import { Result } from '@atj/common';
import { Blueprint } from '@atj/forms';

import { addFormToStorage } from '../context/browser/form-repo';

export const addForm = (
  ctx: { storage: Storage },
  form: Blueprint
): Result<string> => {
  return addFormToStorage(ctx.storage, form);
};
