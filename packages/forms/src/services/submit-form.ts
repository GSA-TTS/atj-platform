import { failure, success, type Result } from '@atj/common';
import {
  type Blueprint,
  type FormSession,
  type FormSessionId,
  createFormSession,
  defaultFormConfig,
} from '../index.js';

import { FormServiceContext } from '../context/index.js';
import { submitPage } from '../patterns/page-set/submit';
import { downloadPackageHandler } from '../patterns/package-download/submit';
import { type FormRoute } from '../route-data.js';
import { getActionString, SubmissionRegistry } from '../submission';

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

  const actionString = formData.action;
  if (typeof actionString !== 'string') {
    return failure(`Invalid action: ${actionString}`);
  }

  // Get the root pattern which should be a page-set
  const rootPatternId = form.root;
  const submitHandlerResult = registry.getHandlerForAction(
    form,
    getActionString({
      handlerId: 'page-set',
      patternId: rootPatternId,
    })
  );

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
  console.log('got sessionId', sessionId);
  if (sessionId === undefined) {
    return success(createFormSession(form, route));
  }
  const sessionResult = await ctx.repository.getFormSession(sessionId);
  if (!sessionResult.success) {
    return failure('Session not found');
  }
  return success(sessionResult.data.data);
};
