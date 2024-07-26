import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import knex, { type Knex } from 'knex';

const getDirname = () => dirname(fileURLToPath(import.meta.url));
const migrationsDirectory = path.resolve(getDirname(), '../../migrations');

export const createKnex = (config: Knex.Config): Knex => knex(config);

export const getTestKnex = (): Knex => {
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
};

export const getDevKnex = (path: string): Knex => {
  return knex({
    client: 'better-sqlite3',
    connection: {
      filename: path,
    },
    useNullAsDefault: true,
    migrations: {
      directory: migrationsDirectory,
      loadExtensions: ['.mjs'],
    },
  });
};
