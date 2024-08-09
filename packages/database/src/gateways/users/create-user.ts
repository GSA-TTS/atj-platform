import { randomUUID } from 'crypto';

import { type DatabaseContext } from '../../context/types.js';

export const createUser = async (ctx: DatabaseContext, email: string) => {
  const id = randomUUID();

  const db = await ctx.getKysely();
  const result = await db
    .insertInto('users')
    .values({
      id,
      email,
    })
    .onConflict(oc => oc.doNothing())
    .executeTakeFirst();

  if (!result.numInsertedOrUpdatedRows) {
    return null;
  }

  return {
    id,
    email,
  };
};
