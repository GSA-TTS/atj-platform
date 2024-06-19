import React from 'react';

import {
  FormManager,
  defaultPatternComponents,
  defaultPatternEditComponents,
} from '@atj/design';

import { getAppContext } from '../context';
import { getFormManagerUrlById, getFormUrl } from '../routes';

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
        urlForForm: getFormUrl,
        urlForFormManager: getFormManagerUrlById,
      }}
    />
  );
}
