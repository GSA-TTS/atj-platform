import React from 'react';

import { FormManager } from '@atj/design';
import { getAppContext } from '../context';

export default function () {
  const ctx = getAppContext();
  return (
    <FormManager
      config={ctx.formConfig}
      formService={ctx.formService}
      baseUrl={ctx.baseUrl}
    />
  );
}
