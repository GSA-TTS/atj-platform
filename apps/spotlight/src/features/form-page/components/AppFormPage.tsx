import React from 'react';

import { defaultPatternComponents, Form } from '@atj/design';
import { defaultFormConfig } from '@atj/forms';

import { getAppContext } from '../../../context.js';
import { useFormSession } from '../hooks/form-session.js';
import { FormRouter } from './FormRouter.js';

export const AppFormPage = () => {
  const ctx = getAppContext();
  return (
    <FormRouter formService={ctx.formService}>
      {({ id: formId, routeParams, pathname }) => {
        const { sessionResponse } = useFormSession({
          formId,
          formService: ctx.formService,
          routeParams,
          pathname,
        });
        return (
          <>
            {sessionResponse.status === 'loading' && <div>Loading...</div>}
            {sessionResponse.status === 'error' && (
              <div className="usa-alert usa-alert--error" role="alert">
                <div className="usa-alert__body">
                  <h4 className="usa-alert__heading">Error loading form</h4>
                  <p className="usa-alert__text">{sessionResponse.message}</p>
                </div>
              </div>
            )}
            {sessionResponse.status === 'loaded' && (
              <Form
                context={{
                  config: defaultFormConfig,
                  components: defaultPatternComponents,
                  uswdsRoot: ctx.uswdsRoot,
                }}
                session={sessionResponse.formSession}
                onSubmit={async data => {
                  /*const newSession = applyPromptResponse(
                    config,
                    session,
                    response
                  );*/
                  const submission = await ctx.formService.submitForm(
                    undefined, // TODO: pass sessionId
                    formId,
                    data
                  );
                  if (submission.success) {
                    submission.data.forEach(document => {
                      downloadPdfDocument(document.fileName, document.data);
                    });
                  } else {
                    console.error(submission.error);
                  }
                }}
              />
            )}
          </>
        );
      }}
    </FormRouter>
  );
};

export const downloadPdfDocument = (fileName: string, pdfData: Uint8Array) => {
  const blob = new Blob([pdfData], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('download', fileName);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
