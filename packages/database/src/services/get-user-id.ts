import { Kysely } from 'kysely';
import { type Database } from '..';

export const getUserId = async (db: Kysely<Database>, email: string) => {
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
