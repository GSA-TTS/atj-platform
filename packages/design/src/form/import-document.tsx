import React from 'react';
import { createBrowserFormService } from '@atj/form-service';

import DocumentImporter from '../form-builder/DocumentImporter';

export const FormDocumentImport = ({ formId }: { formId: string }) => {
  const formService = createBrowserFormService();
  // Fallback to hardcoded data if a magic ID is chosen.
  const result = formService.getForm(formId);
  if (!result.success) {
    return 'null form retrieved from storage';
  }
  return <DocumentImporter formId={formId} form={result.data} />;
};
