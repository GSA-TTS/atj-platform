import React from 'react';

import { FormManager } from '@atj/design';
import { createBrowserFormService } from '@atj/forms';

import { type AppContext } from '../context';
import { getFormManagerUrlById, getFormUrl } from '../routes';

type AppFormManagerContext = {
  baseUrl: AppContext['baseUrl'];
  uswdsRoot: AppContext['uswdsRoot'];
};

export default function ({ ctx }: { ctx: AppFormManagerContext }) {
  const formService = createBrowserFormService();
  return (
    <FormManager
      context={{
        baseUrl: ctx.baseUrl,
        formService: formService,
        uswdsRoot: ctx.uswdsRoot,
        urlForForm: formId => getFormUrl(ctx.baseUrl, formId),
        urlForFormManager: formId => getFormManagerUrlById(ctx.baseUrl, formId),
      }}
    />
  );
}
