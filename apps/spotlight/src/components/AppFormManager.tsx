import React from 'react';

import { FormManager } from '@atj/design';
import { getAppContext } from '../context';

export default function () {
  const ctx = getAppContext();
  return <FormManager formService={ctx.formService} baseUrl={ctx.baseUrl} />;
}
