import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { AvailableFormList } from '@atj/design';
import { service } from '@atj/forms';

import { type AppContext } from '../context';
import { getFormManagerUrlById, getFormUrl } from '../routes';
import DebugTools from './DebugTools';

export default ({ ctx }: { ctx: AppContext }) => {
  const formService = service.createBrowserFormService();
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
        urlForFormManager={formId => getFormManagerUrlById(ctx.baseUrl, formId)}
        formService={formService}
        urlForForm={formId => getFormUrl(ctx.baseUrl, formId)}
      />
    </ErrorBoundary>
  );
};
