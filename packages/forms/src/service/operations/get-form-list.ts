import { Result } from '@atj/common';

import { getFormSummaryListFromStorage } from '../context/browser/form-repo';

export type FormListItem = {
  id: string;
  title: string;
  description: string;
};

export const getFormList = (ctx: {
  storage: Storage;
}): Result<FormListItem[]> => {
  const forms = getFormSummaryListFromStorage(ctx.storage);
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
