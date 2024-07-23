import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

import { type Database } from '../types';

const dialect = new PostgresDialect({
  pool: new Pool({
    database: 'test',
    host: 'localhost',
    user: 'admin',
    port: 5434,
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
