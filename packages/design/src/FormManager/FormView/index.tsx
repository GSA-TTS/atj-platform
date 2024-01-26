import React from 'react';

import { type FormService } from '@atj/form-service';
import Form from '../../Form';

// Assuming this is the structure of your JSON data
export interface Field {
  type: 'text';
  id: string;
  name: string;
  label: string;
  required: boolean;
  initial?: string;
}

export const FormViewById = ({
  formId,
  formService,
}: {
  formId: string;
  formService: FormService;
}) => {
  // Fallback to hardcoded data if a magic ID is chosen.
  const result = formService.getForm(formId);
  if (!result.success) {
    return 'null form retrieved from storage';
  }

  return (
    <Form
      form={result.data}
      onSubmit={async data => {
        const submission = await formService.submitForm(formId, data);
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
