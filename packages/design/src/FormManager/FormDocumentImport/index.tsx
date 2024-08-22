import React, { useEffect, useState } from 'react';

import { Blueprint, type FormService } from '@atj/forms';

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
  formService: FormService;
}) => {
  const [form, setForm] = useState<Blueprint | null>(null);
  useEffect(() => {
    formService.getForm(formId).then(result => {
      if (result.success) {
        setForm(result.data);
      }
    });
  }, []);
  return (
    <>
      {form && (
        <DocumentImporter
          context={context}
          formService={formService}
          baseUrl={baseUrl}
          formId={formId}
          form={form}
        />
      )}
    </>
  );
};
