import React from 'react';

import { FormManager } from '@atj/design';

import { FormServiceClient } from '../lib/api-client';
import { type AppContext } from '../context';
import { getFormManagerUrlById, getFormUrl } from '../routes';

type AppFormManagerContext = {
  baseUrl: AppContext['baseUrl'];
  uswdsRoot: AppContext['uswdsRoot'];
};

export default function ({ ctx }: { ctx: AppFormManagerContext }) {
  const formService = new FormServiceClient({ baseUrl: ctx.baseUrl });
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
