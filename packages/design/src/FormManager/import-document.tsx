import React from 'react';

import { FormConfig } from '@atj/forms';
import { type FormService } from '@atj/form-service';

import DocumentImporter from './DocumentImporter';
import InnerPageTopNav from './internalPageTopNav';

export const FormDocumentImport = ({
  baseUrl,
  config,
  formId,
  formService,
}: {
  baseUrl: string;
  config: FormConfig;
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
      <InnerPageTopNav formId={formId} formService={formService} />
      <DocumentImporter
        config={config}
        formService={formService}
        baseUrl={baseUrl}
        formId={formId}
        form={result.data}
      />
    </>
  );
};
