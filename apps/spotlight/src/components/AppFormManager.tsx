import React from 'react';

import {
  FormManager,
  defaultFormElementComponent,
  defaultFormElementEditComponents,
} from '@atj/design';

import { getAppContext } from '../context';

export default function () {
  const ctx = getAppContext();
  return (
    <FormManager
      context={{
        config: ctx.formConfig,
        components: defaultFormElementComponent,
        editComponents: defaultFormElementEditComponents,
      }}
      formService={ctx.formService}
      baseUrl={ctx.baseUrl}
    />
  );
}
