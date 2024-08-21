import { type Result } from '@atj/common';
import {
  type Blueprint,
  type FormSession,
  applyPromptResponse,
  createFormOutputFieldData,
  fillPDF,
  sessionIsComplete,
} from '../index.js';

import { FormServiceContext } from '../context/index.js';

export const submitForm = async (
  ctx: FormServiceContext,
  //sessionId: string,
  session: FormSession, // TODO: load session from storage by ID
  formId: string,
  formData: Record<string, string>
): Promise<
  Result<
    {
      fileName: string;
      data: Uint8Array;
    }[]
  >
> => {
  const form = ctx.db.getForm(formId);
  if (form === null) {
    return Promise.resolve({
      success: false,
      error: 'Form not found',
    });
  }
  //const session = getSessionFromStorage(ctx.storage, sessionId) || createFormSession(form);
  // For now, the client-side is producing its own error messages.
  // In the future, we'll want this service to return errors to the client.
  const newSessionResult = applyPromptResponse(ctx.config, session, {
    action: 'submit',
    data: formData,
  });
  if (!newSessionResult.success) {
    return Promise.resolve({
      success: false,
      error: newSessionResult.error,
    });
  }
  if (!sessionIsComplete(ctx.config, newSessionResult.data)) {
    return Promise.resolve({
      success: false,
      error: 'Session is not complete',
    });
  }
  return generateDocumentPackage(form, newSessionResult.data.data.values);
};

const generateDocumentPackage = async (
  form: Blueprint,
  formData: Record<string, string>
) => {
  const errors = new Array<string>();
  const documents = new Array<{ fileName: string; data: Uint8Array }>();
  for (const document of form.outputs) {
    const docFieldData = createFormOutputFieldData(document, formData);
    const pdfDocument = await fillPDF(document.data, docFieldData);
    if (!pdfDocument.success) {
      errors.push(pdfDocument.error);
    } else {
      documents.push({
        fileName: document.path,
        data: pdfDocument.data,
      });
    }
  }
  if (errors.length > 0) {
    return {
      success: false as const,
      error: errors.join('\n'),
    };
  }
  return {
    success: true as const,
    data: documents,
  };
};
