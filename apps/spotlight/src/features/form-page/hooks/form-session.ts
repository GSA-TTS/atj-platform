import { useEffect, useState } from 'react';

import { type FormService, type FormSession, type RouteData } from '@atj/forms';

export const useFormSession = (opts: {
  formService: FormService;
  formId: string;
  route: {
    params: RouteData;
    url: string;
  };
}) => {
  const [formSessionResponse, setFormSessionResponse] = useState<
    | { status: 'loading' }
    | { status: 'error'; message: string }
    | { status: 'loaded'; formSession: FormSession }
  >({ status: 'loading' });
  useEffect(() => {
    opts.formService
      .getFormSession({
        formId: opts.formId,
        formRoute: {
          params: opts.route.params,
          url: `#${opts.route.url}`,
        },
        //sessionId: undefined,
      })
      .then(result => {
        if (result.success === false) {
          console.error(result.error);
          setFormSessionResponse({
            status: 'error',
            message: result.error,
          });
        } else {
          setFormSessionResponse({
            status: 'loaded',
            formSession: result.data.data,
          });
        }
      });
  }, []);
  return {
    formSessionResponse,
    setFormSession: (formSession: FormSession) => {
      setFormSessionResponse({ status: 'loaded', formSession });
    },
  };
};
