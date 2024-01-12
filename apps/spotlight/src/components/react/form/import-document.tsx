import React from 'react';
import { getFormFromStorage } from '../../../lib/form-repo';
import { createFormContext, createPrompt } from '@atj/forms';
import { DocumentImporter } from '../form-builder/document-importer';

export const FormDocumentImport = ({ formId }: { formId: string }) => {
  // Fallback to hardcoded data if a magic ID is chosen.
  const form = getFormFromStorage(window.localStorage, formId);
  if (!form) {
    return 'null form retrieved from storage';
  }
  const context = createFormContext(form);
  const prompt = createPrompt(context);

  return <DocumentImporter />;
};
