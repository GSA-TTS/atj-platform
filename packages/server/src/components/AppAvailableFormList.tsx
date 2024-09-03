import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { AvailableFormList } from '@atj/design';

import { type AppContext } from '../context';
import { getFormManagerUrlById, getFormUrl } from '../routes';
import DebugTools from './DebugTools';

export default ({ ctx }: { ctx: AppContext }) => {
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
        formService={ctx.formService}
        urlForForm={formId => getFormUrl(ctx.baseUrl, formId)}
      />
    </ErrorBoundary>
  );
};
