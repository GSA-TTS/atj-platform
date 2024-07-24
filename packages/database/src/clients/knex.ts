import path from 'path';

import knex, { type Knex } from 'knex';

const migrationsDirectory = path.resolve(__dirname, '../../migrations');

export const createKnex = (config: Knex.Config): Knex => knex(config);

export function getTestKnex(): Knex {
  return knex({
    client: 'better-sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
    migrations: {
      directory: migrationsDirectory,
      loadExtensions: ['.mjs'],
    },
  });
}
