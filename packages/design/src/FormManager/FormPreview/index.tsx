import React from 'react';

import { type Blueprint, createSession } from '@atj/forms';
import { FormService } from '@atj/form-service';

import Form, { type FormUIContext } from '../../Form';

export default function FormPreview({
  context,
  form,
}: {
  context: FormUIContext;
  form: Blueprint;
}) {
  const session = createSession(form);
  return <Form context={context} session={session} />;
}

export const FormPreviewById = ({
  context,
  formService,
  formId,
}: {
  context: FormUIContext;
  formService: FormService;
  formId: string;
}) => {
  const form = formService.getForm(formId);
  if (!form.success) {
    return <div>Error loading form preview</div>;
  }
  return <FormPreview context={context} form={form.data} />;
};
