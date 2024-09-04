import React, { useEffect, useState } from 'react';
import { useParams, HashRouter, Route, Routes } from 'react-router-dom';

import { type Result } from '@atj/common';
import {
  type Blueprint,
  type FormService,
  defaultFormConfig,
} from '@atj/forms';
import { createFormSession } from '@atj/forms';

import { useQueryString } from './hooks.js';
import { defaultPatternComponents } from '../index.js';
import Form, { FormUIContext } from '../Form/index.js';

// Wrapper around Form that includes a client-side router for loading forms.
export default function FormRouter({
  uswdsRoot,
  formService,
}: {
  uswdsRoot: `${string}/`;
  formService: FormService;
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

            const [formResult, setFormResult] = useState<Result<
              Blueprint,
              { status: number; message: string }
            > | null>(null);
            useEffect(() => {
              formService.getForm(formId).then(result => {
                setFormResult(result);
              });
            }, []);

            if (formResult === null) {
              return;
            }
            if (formResult.success === false) {
              return (
                <div className="usa-alert usa-alert--error" role="alert">
                  <div className="usa-alert__body">
                    <h4 className="usa-alert__heading">Error loading form</h4>
                    <p className="usa-alert__text">
                      {formResult.error.message}
                    </p>
                  </div>
                </div>
              );
            }

            const session = createFormSession(formResult.data, queryString);
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
