import React from 'react';
import { createBrowserFormService } from '@atj/form-service';

import { DocumentImporter } from '../form-builder/document-importer';

export const FormDocumentImport = ({ formId }: { formId: string }) => {
  const formService = createBrowserFormService();
  // Fallback to hardcoded data if a magic ID is chosen.
  const form = formService.getForm(formId);
  if (!form) {
    return 'null form retrieved from storage';
  }
  return <DocumentImporter formId={formId} form={form} />;
};
