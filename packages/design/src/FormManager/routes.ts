type Route<UrlParams extends string[] = string[]> = {
  slug: string;
  path: string;
  getUrl: (...args: UrlParams) => string;
};

export const MyForms: Route<[]> = {
  slug: '',
  path: '/',
  getUrl: () => `#`,
};

export const GuidedFormCreation: Route<[]> = {
  slug: 'create-form',
  path: '/create-form',
  getUrl: () => `#/create-form`,
};

export const Inspect: Route = {
  slug: 'inspect',
  path: '/:formId/inspect',
  getUrl: (formId: string) => `#/${formId}/inspect`,
};

export const Preview: Route = {
  slug: 'preview',
  path: '/:formId/preview',
  getUrl: (formId: string) => `#/${formId}/preview`,
};

export const Upload: Route = {
  slug: 'upload',
  path: '/:formId/upload',
  getUrl: (formId: string) => `#/${formId}/upload`,
};

export const Create: Route = {
  slug: 'create',
  path: '/:formId/create',
  getUrl: (formId: string) => `#/${formId}/create`,
};

export const Configure: Route = {
  slug: 'configure',
  path: '/:formId/configure',
  getUrl: (formId: string) => `#/${formId}/configure`,
};

export const Publish: Route = {
  slug: 'publish',
  path: '/:formId/publish',
  getUrl: (formId: string) => `#/${formId}/publish`,
};

export const Delete: Route = {
  slug: 'delete',
  path: '/:formId/delete',
  getUrl: (formId: string) => `#/${formId}/delete`,
};
