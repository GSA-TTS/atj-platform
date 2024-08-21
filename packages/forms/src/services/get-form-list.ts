import { Result } from '@atj/common';

import { type FormServiceContext } from '../context/index.js';

export type FormListItem = {
  id: string;
  title: string;
  description: string;
};

export const getFormList = (
  ctx: FormServiceContext
): Result<FormListItem[]> => {
  const forms = ctx.db.getFormList();
  if (forms === null) {
    return {
      success: false,
      error: 'error getting form list',
    };
  }
  return {
    success: true,
    data: forms,
  };
};
