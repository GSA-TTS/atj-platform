import { Kysely } from 'kysely';
import { type Database } from '..';
import { randomUUID } from 'crypto';

export const createUser = async (db: Kysely<Database>, email: string) => {
  const id = randomUUID();

  const result = await db
    .insertInto('users')
    .values({
      id,
      email,
    })
    .executeTakeFirst();

  if (!result.insertId) {
    return null;
  }

  return {
    id,
    email,
  };
};
