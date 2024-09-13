import { failure, success } from '@atj/common';
import { DatabaseContext } from '@atj/database';

export const upsertFormSession = async (
  ctx: DatabaseContext,
  opts: {
    formId: string;
    data: any;
    id?: string;
  }
) => {
  const db = await ctx.getKysely();
  const strData = JSON.stringify(opts.data);
  const id = opts.id || crypto.randomUUID();
  return await db
    .insertInto('form_sessions')
    .values({
      id,
      form_id: opts.formId,
      data: strData,
    })
    .onConflict(oc =>
      oc.columns(['id', 'form_id']).doUpdateSet({
        data: strData,
      })
    )
    .executeTakeFirstOrThrow()
    .then(() => {
      return success({
        timestamp: new Date(),
        id,
      });
    })
    .catch(err => {
      return failure(err.message);
    });
};
