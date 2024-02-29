import React from 'react';

import {
  FormManager,
  defaultFormElementComponents,
  defaultFormElementEditComponents,
} from '@atj/design';

import { getAppContext } from '../context';

export default function () {
  const ctx = getAppContext();
  return (
    <FormManager
      context={{
        config: ctx.formConfig,
        components: defaultFormElementComponents,
        editComponents: defaultFormElementEditComponents,
        uswdsRoot: ctx.uswdsRoot,
      }}
      formService={ctx.formService}
      baseUrl={ctx.baseUrl}
    />
  );
}
