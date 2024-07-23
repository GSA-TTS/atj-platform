import path from 'path';

import knex, { type Knex } from 'knex';

const migrationsDirectory = path.resolve(__dirname, '../../migrations');

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
