import { failure, success, type Result } from '@atj/common';

import { type FormServiceContext } from '../context/index.js';
import { submitPage } from '../patterns/page-set/submit';
import { downloadPackageHandler } from '../patterns/package-download/submit';
import { type FormRoute } from '../route-data.js';
import { SubmissionRegistry } from '../submission';
import {
  createFormSession,
  type FormSession,
  type FormSessionId,
} from '../session.js';
import { defaultFormConfig } from '../patterns/index.js';
import type { Blueprint } from '../types.js';

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
    attachments?: {
      fileName: string;
      data: Uint8Array;
    }[];
  }>
>;

// Temportary location for the SubmissionRegistry.
const registry = new SubmissionRegistry(defaultFormConfig);
registry.registerHandler({
  handlerId: 'page-set',
  handler: submitPage,
});
registry.registerHandler({
  handlerId: 'package-download',
  handler: downloadPackageHandler,
});

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
    return sessionResult;
  }

  const session: FormSession = route
    ? {
        ...sessionResult.data,
        route,
      }
    : sessionResult.data;

  const actionString = formData['action'];
  if (typeof actionString !== 'string') {
    return failure(`Invalid action: ${actionString}`);
  }

  const submitHandlerResult = registry.getHandlerForAction(form, actionString);
  if (!submitHandlerResult.success) {
    return failure(submitHandlerResult.error);
  }

  const { handler, pattern } = submitHandlerResult.data;
  const newSessionResult = await handler(ctx.config, {
    pattern,
    session,
    data: formData,
  });

  if (!newSessionResult.success) {
    return failure(newSessionResult.error);
  }

  const saveFormSessionResult = await ctx.repository.upsertFormSession({
    id: sessionId,
    formId,
    data: newSessionResult.data.session,
  });
  console.log(
    'submitForm: saveFormSessionResult',
    saveFormSessionResult.success
  );
  if (!saveFormSessionResult.success) {
    return failure(saveFormSessionResult.error);
  }

  /*
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
  */
  console.log('submitForm: success', newSessionResult.data.session);
  return success({
    sessionId: saveFormSessionResult.data.id,
    session: newSessionResult.data.session,
    attachments: newSessionResult.data.attachments,
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
