import { type Result, failure, success } from '@atj/common';

import { type FormServiceContext } from '../context/index.js';
import { type FormRoute } from '../route-data.js';
import { type FormSession, createFormSession } from '../session.js';

type GetFormSession = (
  ctx: FormServiceContext,
  opts: {
    formId: string;
    formRoute: FormRoute;
    sessionId?: string;
  }
) => Promise<Result<FormSession>>;

export const getFormSession: GetFormSession = async (ctx, opts) => {
  const form = await ctx.repository.getForm(opts.formId);
  if (form === null) {
    return failure(`form '${opts.formId} does not exist`);
  }

  // If this request corresponds to an non-existent session, return a new
  // session that is not yet persisted.
  if (opts.sessionId === undefined) {
    const formSession = await createFormSession(form, opts.formRoute);
    return success(formSession);
  }

  const formSession = await ctx.repository.getFormSession(opts.sessionId);
  if (!formSession.success) {
    return failure(formSession.error);
  }
  return success(formSession.data.data);
};
