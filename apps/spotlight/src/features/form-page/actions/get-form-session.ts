import { type FormService, type FormSession, type RouteData } from '@atj/forms';

export type FormSessionResponse =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | {
      status: 'loaded';
      formSession: FormSession;
      sessionId: string | undefined;
    };

type GetFormSessionContext = {
  formService: FormService;
  onGetFormSessionResult: (result: FormSessionResponse) => void;
};

type GetFormSessionOptions = {
  formId: string;
  route: {
    params: RouteData;
    url: string;
  };
  sessionId?: string;
};

export type GetFormSession = (
  ctx: GetFormSessionContext,
  opts: GetFormSessionOptions
) => void;

export const getFormSession: GetFormSession = async (ctx, opts) => {
  ctx.onGetFormSessionResult({ status: 'loading' });
  ctx.formService
    .getFormSession({
      formId: opts.formId,
      formRoute: {
        params: opts.route.params,
        url: `#${opts.route.url}`,
      },
      sessionId: opts.sessionId,
    })
    .then(result => {
      if (result.success === false) {
        console.error(result.error);
        ctx.onGetFormSessionResult({
          status: 'error',
          message: result.error,
        });
      } else {
        console.log('using session', result.data.data);
        ctx.onGetFormSessionResult({
          status: 'loaded',
          formSession: result.data.data,
          sessionId: result.data.id,
        });
      }
    });
};
