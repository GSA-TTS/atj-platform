import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { AvailableFormList } from '@atj/design';
import { getAppContext } from '../context';
import { getFormUrl } from '../routes';
import DebugTools from './DebugTools';

export default () => {
  const ctx = getAppContext();
  return (
    <ErrorBoundary
      fallback={
        <div>
          There was an unexpected error rendering the form list.
          <DebugTools />
        </div>
      }
    >
      <AvailableFormList
        formService={ctx.formService}
        urlForForm={getFormUrl}
      />
    </ErrorBoundary>
  );
};
