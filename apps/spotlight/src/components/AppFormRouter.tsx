import React from 'react';

import { FormRouter, defaultPatternComponents } from '@atj/design';
import { getAppContext } from '../context';

export default function AppFormRouter() {
  const ctx = getAppContext();
  return <FormRouter uswdsRoot={ctx.uswdsRoot} formService={ctx.formService} />;
}
