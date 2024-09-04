import { type Result, failure, success } from '@atj/common';

import { type DatabaseContext } from '@atj/database';
import { stringifyForm } from './serialize.js';

export const addForm = async (
  ctx: DatabaseContext,
  form: any // Blueprint
): Promise<Result<{ timestamp: string; id: string }>> => {
  const uuid = crypto.randomUUID();
  const db = await ctx.getKysely();
  return db
    .insertInto('forms')
    .values({
      id: uuid,
      data: stringifyForm(form),
    })
    .execute()
    .then(() =>
      success({
        timestamp: new Date().toISOString(),
        id: uuid,
      })
    )
    .catch(err => failure(err.message));
};
