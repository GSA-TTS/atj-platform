import { failure, success } from '@atj/common';
import { DatabaseContext } from '@atj/database';

export const getFormSession = async (ctx: DatabaseContext, id: string) => {
  const db = await ctx.getKysely();
  return await db
    .selectFrom('form_sessions')
    .where('id', '=', id)
    .select(['id', 'form_id', 'data'])
    .executeTakeFirstOrThrow()
    .then(result => {
      return success(result);
    })
    .catch(err => {
      return failure(err.message);
    });
};
