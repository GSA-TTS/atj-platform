//import { type Blueprint } from '@atj/forms';
type Blueprint = any;
import { type DatabaseContext } from '../../context/types';
import { stringifyForm } from './serialize';
import { failure, success } from '@atj/common';

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
