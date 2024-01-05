import { getAppContext } from '../context';

export const getFormEditUrl = (formId: string) => {
  const context = getAppContext();
  return `${context.baseUrl}forms/${formId}`;
};
