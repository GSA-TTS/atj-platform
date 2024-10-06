import { useEffect, useState } from 'react';

import { type FormService, type FormSession, type RouteData } from '@atj/forms';

export const useFormSession = (opts: {
  formService: FormService;
  formId: string;
  routeParams: RouteData;
  pathname: string;
}) => {
  const [sessionResponse, setSessionResponse] = useState<
    | { status: 'loading' }
    | { status: 'error'; message: string }
    | { status: 'loaded'; formSession: FormSession }
  >({ status: 'loading' });
  useEffect(() => {
    opts.formService
      .getFormSession({
        formId: opts.formId,
        formRoute: {
          params: opts.routeParams,
          url: `#${opts.pathname}`,
        },
        //sessionId: undefined,
      })
      .then(result => {
        if (result.success === false) {
          console.error(result.error);
          setSessionResponse({
            status: 'error',
            message: result.error,
          });
        } else {
          setSessionResponse({
            status: 'loaded',
            formSession: result.data,
          });
        }
      });
  }, []);
  return { sessionResponse };
};
