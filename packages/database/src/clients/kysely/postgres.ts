import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';

import { type Database } from './types.js';

export const createPostgresDatabase = (
  connectionString: string,
  ssl: boolean
) => {
  return new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new pg.Pool({
        connectionString,
        ssl: ssl ? { rejectUnauthorized: false } : false,
      }),
    }),
  });
};
