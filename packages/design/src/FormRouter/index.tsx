import React from 'react';
import { useParams, HashRouter, Route, Routes } from 'react-router-dom';

import { defaultFormConfig, service } from '@atj/forms';
import { createFormSession } from '@atj/forms';

import { useQueryString } from './hooks';
import { defaultPatternComponents } from '..';
import Form, { FormUIContext } from '../Form';

// Wrapper around Form that includes a client-side router for loading forms.
export default function FormRouter({
  uswdsRoot,
  formService,
}: {
  uswdsRoot: `${string}/`;
  formService: service.FormService;
}) {
  // For now, hardcode the pattern configuration.
  // If these are user-configurable, we'll likely need to, in some manner,
  // inject a compiled bundle into the application.
  const context: FormUIContext = {
    config: defaultFormConfig,
    components: defaultPatternComponents,
    uswdsRoot,
  };
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/:formId"
          Component={() => {
            const { formId } = useParams();
            const queryString = useQueryString();
            if (formId === undefined) {
              return <div>formId is undefined</div>;
            }
            const result = formService.getForm(formId);
            if (!result.success) {
              return (
                <div className="usa-alert usa-alert--error" role="alert">
                  <div className="usa-alert__body">
                    <h4 className="usa-alert__heading">Error loading form</h4>
                    <p className="usa-alert__text">{result.error}</p>
                  </div>
                </div>
              );
            }

            const session = createFormSession(result.data, queryString);
            return (
              <Form
                context={context}
                session={session}
                onSubmit={async data => {
                  /*const newSession = applyPromptResponse(
                    config,
                    session,
                    response
                  );*/
                  const submission = await formService.submitForm(
                    session,
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
            );
          }}
        />
      </Routes>
    </HashRouter>
  );
}

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
