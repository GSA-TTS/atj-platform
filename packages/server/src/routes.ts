export const getFormUrl = (baseUrl: string, formId: string) => {
  return `${baseUrl}forms#${formId}`;
};

export const getFormManagerUrlById = (baseUrl: string, formId: string) => {
  return `${baseUrl}#/${formId}`;
};

export const getManageUrl = (baseUrl: string) => {
  return `${baseUrl}manage`;
};

export const getHomeUrl = (baseUrl: string) => {
  return baseUrl;
};

export const getFaviconUrl = (baseUrl: string) => {
  return `${baseUrl}favicon.ico`;
};

export const getStorybookUrl = (baseUrl: string) => {
  return `${baseUrl}design/index.html`;
};
