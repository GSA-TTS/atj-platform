import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

import { type Database } from './types';

export const createPostgresDatabase = (connectionString: string) => {
  return new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString,
      }),
    }),
  });
};
