import { failure, success, type Result } from '@atj/common';
import {
  type Blueprint,
  type FormSession,
  type FormSessionId,
  applyPromptResponse,
  createFormOutputFieldData,
  createFormSession,
  fillPDF,
  sessionIsComplete,
} from '../index.js';

import { FormServiceContext } from '../context/index.js';
import { type FormRoute } from '../route-data.js';

export type SubmitForm = (
  ctx: FormServiceContext,
  sessionId: FormSessionId | undefined,
  formId: string,
  formData: Record<string, string>,
  route?: FormRoute
) => Promise<
  Result<{
    sessionId: FormSessionId;
    session: FormSession;
    documents?: {
      fileName: string;
      data: Uint8Array;
    }[];
  }>
>;

export const submitForm: SubmitForm = async (
  ctx,
  sessionId,
  formId,
  formData,
  route
) => {
  const form = await ctx.repository.getForm(formId);
  if (form === null) {
    return failure('Form not found');
  }

  const sessionResult = await getFormSessionOrCreate(
    ctx,
    form,
    route,
    sessionId
  );
  if (!sessionResult.success) {
    return failure('Session not found');
  }

  //const session = getSessionFromStorage(ctx.storage, sessionId) || createFormSession(form);
  // For now, the client-side is producing its own error messages.
  // In the future, we'll want this service to return errors to the client.
  const newSessionResult = applyPromptResponse(ctx.config, sessionResult.data, {
    action: 'submit',
    data: formData,
  });
  if (!newSessionResult.success) {
    return failure(newSessionResult.error);
  }

  const saveFormSessionResult = await ctx.repository.upsertFormSession({
    id: sessionId,
    formId,
    data: newSessionResult.data,
  });
  if (!saveFormSessionResult.success) {
    return failure(saveFormSessionResult.error);
  }

  /* TODO: consider whether this is necessary, or should happen elsewhere. */
  if (sessionIsComplete(ctx.config, newSessionResult.data)) {
    const documentsResult = await generateDocumentPackage(
      form,
      newSessionResult.data.data.values
    );
    if (!documentsResult.success) {
      return failure(documentsResult.error);
    }

    return success({
      sessionId: saveFormSessionResult.data.id,
      session: newSessionResult.data,
      documents: documentsResult.data,
    });
  }

  return success({
    sessionId: saveFormSessionResult.data.id,
    session: newSessionResult.data,
  });
};

const getFormSessionOrCreate = async (
  ctx: FormServiceContext,
  form: Blueprint,
  route?: FormRoute,
  sessionId?: FormSessionId
) => {
  if (sessionId === undefined) {
    return success(createFormSession(form, route));
  }
  const sessionResult = await ctx.repository.getFormSession(sessionId);
  if (!sessionResult.success) {
    return failure('Session not found');
  }
  return success(sessionResult.data.data);
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
