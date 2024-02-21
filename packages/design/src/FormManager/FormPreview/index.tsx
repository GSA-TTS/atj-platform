import React from 'react';

import { type FormConfig, createFormSession } from '@atj/forms';
import { type FormService } from '@atj/form-service';

import Form from '../../Form';
import InnerPageTopNav from '../internalPageTopNav';

export const FormViewById = ({
  config,
  formId,
  formService,
}: {
  config: FormConfig;
  formId: string;
  formService: FormService;
}) => {
  // Fallback to hardcoded data if a magic ID is chosen.
  const result = formService.getForm(formId);
  if (!result.success) {
    return 'null form retrieved from storage';
  }
  const form = result.data;
  const session = createFormSession(form);
  return (
    <>
    <InnerPageTopNav formId={formId} formService={formService} />
    <Form
      config={config}
      session={session}
      onSubmit={async data => {
        const submission = await formService.submitForm(session, formId, data);
        if (submission.success) {
          submission.data.forEach(document => {
            downloadPdfDocument(document.fileName, document.data);
          });
        } else {
          console.error(submission.error);
        }
      }}
    />
    </>
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
