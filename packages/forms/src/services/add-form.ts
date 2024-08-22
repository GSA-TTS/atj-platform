import { Result } from '@atj/common';
import { Blueprint } from '../index.js';

import { type FormServiceContext } from '../context/index.js';

export const addForm = async (
  ctx: FormServiceContext,
  form: Blueprint
): Promise<Result<{ timestamp: string; id: string }>> => {
  return ctx.repository.addForm(form);
};
