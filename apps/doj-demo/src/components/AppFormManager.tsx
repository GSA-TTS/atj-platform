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
        baseUrl: ctx.baseUrl,
        components: defaultPatternComponents,
        config: ctx.formConfig,
        editComponents: defaultPatternEditComponents,
        formService: ctx.formService,
        uswdsRoot: ctx.uswdsRoot,
      }}
    />
  );
}
