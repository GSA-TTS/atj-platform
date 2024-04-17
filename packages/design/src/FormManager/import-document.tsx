import React from 'react';

import { type FormService } from '@atj/form-service';

import { type FormUIContext } from '../Form';
import DocumentImporter from './DocumentImporter';
import ManagerNav from './ManagerNav';

export const FormDocumentImport = ({
  baseUrl,
  context,
  formId,
  formService,
}: {
  baseUrl: string;
  context: FormUIContext;
  formId: string;
  formService: FormService;
}) => {
  // Fallback to hardcoded data if a magic ID is chosen.
  const result = formService.getForm(formId);
  if (!result.success) {
    return 'null form retrieved from storage';
  }
  return (
    <>
      <ManagerNav />
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
