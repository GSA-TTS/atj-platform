import React from 'react';

import { FormRouter } from '@atj/design';
import { getAppContext } from '../context';

export default function AppFormRouter() {
  const ctx = getAppContext();
  return <FormRouter formService={ctx.formService} />;
}
