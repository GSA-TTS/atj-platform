import React from 'react';

import { service } from '@atj/forms';

import { type FormUIContext } from '../../Form';
import DocumentImporter from './DocumentImporter';

export const FormDocumentImport = ({
  baseUrl,
  context,
  formId,
  formService,
}: {
  baseUrl: string;
  context: FormUIContext;
  formId: string;
  formService: service.FormService;
}) => {
  // Fallback to hardcoded data if a magic ID is chosen.
  const result = formService.getForm(formId);
  if (!result.success) {
    return 'null form retrieved from storage';
  }
  return (
    <>
      <DocumentImporter
        context={context}
        formService={formService}
        baseUrl={baseUrl}
        formId={formId}
        form={result.data}
      />
    </>
  );
};
