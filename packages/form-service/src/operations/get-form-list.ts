import { getFormListFromStorage } from '../context/browser/form-repo';

export const getFormList = (ctx: { storage: Storage }): Result<string[]> => {
  const result = getFormListFromStorage(ctx.storage);
  if (result === null) {
    return {
      success: false,
      error: 'error getting form list',
    };
  }
  return {
    success: true,
    data: result,
  };
};
