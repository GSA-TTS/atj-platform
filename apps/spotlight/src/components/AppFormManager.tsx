import React from 'react';

import { FormManager } from '@atj/design';

import { getAppContext } from '../context.js';
import { getFormManagerUrlById, getFormUrl } from '../routes.js';

export default function () {
  const ctx = getAppContext();
  return (
    <FormManager
      context={{
        baseUrl: ctx.baseUrl,
        formService: ctx.formService,
        uswdsRoot: ctx.uswdsRoot,
        urlForForm: getFormUrl,
        urlForFormManager: getFormManagerUrlById,
      }}
    />
  );
}
