import React from 'react';

import { FormRouter } from '@atj/design';
import { createBrowserFormService } from '@atj/forms';

import { type AppContext } from '../context';

export default function AppFormRouter({
  uswdsRoot,
}: {
  uswdsRoot: AppContext['uswdsRoot'];
}) {
  const formService = createBrowserFormService();
  return <FormRouter uswdsRoot={uswdsRoot} formService={formService} />;
}
