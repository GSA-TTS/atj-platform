import React from 'react';

import { FormRouter } from '@atj/design';

import { type AppContext } from '../context';
import { FormServiceClient } from '../lib/api-client';

export default function AppFormRouter({
  baseUrl,
  uswdsRoot,
}: {
  baseUrl: AppContext['baseUrl'];
  uswdsRoot: AppContext['uswdsRoot'];
}) {
  const formService = new FormServiceClient({ baseUrl: baseUrl });
  return <FormRouter uswdsRoot={uswdsRoot} formService={formService} />;
}
