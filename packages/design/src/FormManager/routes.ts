type Route<UrlParams extends string[] = string[]> = {
  path: string;
  getUrl: (...args: UrlParams) => string;
};

export const MyForms: Route<[]> = {
  path: '/',
  getUrl: () => `#`,
};

export const Preview: Route = {
  path: '/:formId/preview',
  getUrl: (formId: string) => `#/${formId}/preview`,
};

export const Upload: Route = {
  path: '/:formId/upload',
  getUrl: (formId: string) => `#/${formId}/upload`,
};

export const Create: Route = {
  path: '/:formId/create',
  getUrl: (formId: string) => `#/${formId}/create`,
};

export const Configure: Route = {
  path: '/:formId/configure',
  getUrl: (formId: string) => `#/${formId}/configure`,
};

export const Publish: Route = {
  path: '/:formId/publish',
  getUrl: (formId: string) => `#/${formId}/publish`,
};

export const Delete: Route = {
  path: '/:formId/delete',
  getUrl: (formId: string) => `#/${formId}/delete`,
};
