import React from 'react';
import { createBrowserFormService } from '@atj/form-service';

import DocumentImporter from './DocumentImporter';

export const FormDocumentImport = ({
  baseUrl,
  formId,
}: {
  baseUrl: string;
  formId: string;
}) => {
  const formService = createBrowserFormService();
  // Fallback to hardcoded data if a magic ID is chosen.
  const result = formService.getForm(formId);
  if (!result.success) {
    return 'null form retrieved from storage';
  }
  return (
    <DocumentImporter baseUrl={baseUrl} formId={formId} form={result.data} />
  );
};
