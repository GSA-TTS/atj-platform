import { type Blueprint } from '@atj/forms';

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
    .insertInto('forms')
    .values([
      {
        id,
        data: stringifyForm(blueprint),
      },
    ])
    .execute()
    .then(() =>
      success({
        timestamp: new Date(),
        id,
      })
    )
    .catch(err => failure(err.message));
};
