import { Result } from '@atj/common';
import { Blueprint } from '../../..';

import { addFormToStorage } from '../context/browser/form-repo';

export const addForm = (
  ctx: { storage: Storage },
  form: Blueprint
): Result<{ timestamp: Date; id: string }> => {
  return addFormToStorage(ctx.storage, form);
};
