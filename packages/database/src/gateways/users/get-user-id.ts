import { type DatabaseContext } from '../..';

export const getUserId = async (ctx: DatabaseContext, email: string) => {
  const db = await ctx.getKysely();
  const user = await db
    .selectFrom('users')
    .select('id')
    .where('email', '=', email)
    .executeTakeFirst();

  if (!user) {
    return null;
  }

  return user.id;
};
