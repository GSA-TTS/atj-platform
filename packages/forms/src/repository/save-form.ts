import { failure, success } from '@atj/common';
import { type DatabaseContext } from '@atj/database';

import { type Blueprint } from '../index.js';
import { stringifyForm } from './serialize.js';

export const saveForm = async (
  ctx: DatabaseContext,
  id: string,
  blueprint: Blueprint
) => {
  const db = await ctx.getKysely();

  return await db
    .updateTable('forms')
    .set({
      data: stringifyForm(blueprint),
    })
    .where('id', '=', id)
    .execute()
    .then(() =>
      success({
        timestamp: new Date(),
        id,
      })
    )
    .catch(err => failure(err.message));
};
