import React from 'react';

import {
  type FormConfig,
  type FormDefinition,
  createFormSession,
} from '@atj/forms';

import Form from '../../Form';
import { FormService } from '@atj/form-service';

export default function FormPreview({
  config,
  form,
}: {
  config: FormConfig;
  form: FormDefinition;
}) {
  const session = createFormSession(form);
  return <Form config={config} session={session} />;
}

export const FormPreviewById = ({
  config,
  formService,
  formId,
}: {
  config: FormConfig;
  formService: FormService;
  formId: string;
}) => {
  const form = formService.getForm(formId);
  if (!form.success) {
    return <div>Error loading form preview</div>;
  }
  return <FormPreview config={config} form={form.data} />;
};
