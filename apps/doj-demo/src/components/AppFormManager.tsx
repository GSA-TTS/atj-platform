import React from 'react';

import {
  FormManager,
  defaultPatternComponents,
  defaultPatternEditComponents,
} from '@atj/design';

import { getAppContext } from '../context';

export default function () {
  const ctx = getAppContext();
  return (
    <FormManager
      context={{
        config: ctx.formConfig,
        components: defaultPatternComponents,
        editComponents: defaultPatternEditComponents,
        uswdsRoot: ctx.uswdsRoot,
      }}
      formService={ctx.formService}
      baseUrl={ctx.baseUrl}
    />
  );
}
