import React from 'react';
import { getFormFromStorage } from '../../../lib/form-repo';
import { DocumentImporter } from '../form-builder/document-importer';

export const FormDocumentImport = ({ formId }: { formId: string }) => {
  // Fallback to hardcoded data if a magic ID is chosen.
  const form = getFormFromStorage(window.localStorage, formId);
  if (!form) {
    return 'null form retrieved from storage';
  }
  return <DocumentImporter formId={formId} form={form} />;
};
