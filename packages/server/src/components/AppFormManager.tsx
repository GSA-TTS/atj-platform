import React from 'react';

import { FormManager } from '@atj/design';

import { type AppContext } from '../context';
import { getFormManagerUrlById, getFormUrl } from '../routes';

type AppFormManagerContext = {
  baseUrl: AppContext['baseUrl'];
  formService: AppContext['formService'];
  uswdsRoot: AppContext['uswdsRoot'];
};

export default function ({ ctx }: { ctx: AppFormManagerContext }) {
  return (
    <FormManager
      context={{
        baseUrl: ctx.baseUrl,
        formService: ctx.formService,
        uswdsRoot: ctx.uswdsRoot,
        urlForForm: formId => getFormUrl(ctx.baseUrl, formId),
        urlForFormManager: formId => getFormManagerUrlById(ctx.baseUrl, formId),
      }}
    />
  );
}
