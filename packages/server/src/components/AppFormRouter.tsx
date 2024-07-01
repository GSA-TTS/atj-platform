import React from 'react';

import { FormRouter } from '@atj/design';
import { service } from '@atj/forms';

import { type AppContext } from '../context';

export default function AppFormRouter({
  uswdsRoot,
}: {
  uswdsRoot: AppContext['uswdsRoot'];
}) {
  const formService = service.createBrowserFormService();
  return <FormRouter uswdsRoot={uswdsRoot} formService={formService} />;
}
