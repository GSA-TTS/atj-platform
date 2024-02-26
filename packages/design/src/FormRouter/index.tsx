import React from 'react';
import { useParams, HashRouter, Route, Routes } from 'react-router-dom';

import { type FormService } from '@atj/form-service';
import Form, { type FormUIContext } from '../Form';
import { createFormSession } from '@atj/forms';

// Wrapper around Form that includes a client-side router for loading forms.
export default function FormRouter({
  context,
  formService,
}: {
  context: FormUIContext;
  formService: FormService;
}) {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/:formId"
          Component={() => {
            const { formId } = useParams();
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
            const session = createFormSession(result.data);
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
