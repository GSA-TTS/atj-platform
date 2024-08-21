import React from 'react';

import { FormRouter } from '@atj/design';

import { type AppContext } from '../context';

export default function AppFormRouter({
  formService,
  uswdsRoot,
}: {
  formService: AppContext['formService'];
  uswdsRoot: AppContext['uswdsRoot'];
}) {
  return <FormRouter uswdsRoot={uswdsRoot} formService={formService} />;
}
