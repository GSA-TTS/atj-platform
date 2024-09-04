import React from 'react';

import { FormRouter } from '@atj/design';
import { getAppContext } from '../context.js';

export default function AppFormRouter() {
  const ctx = getAppContext();
  return <FormRouter uswdsRoot={ctx.uswdsRoot} formService={ctx.formService} />;
}
