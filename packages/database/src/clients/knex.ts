import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import knex, { type Knex } from 'knex';

const migrationsDirectory = path.resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../../migrations'
);

export const createKnex = (config: Knex.Config): Knex => knex(config);

export const getPostgresKnex = (
  connectionString: string,
  ssl: boolean = false
): Knex => {
  return knex({
    client: 'pg',
    connection: {
      connectionString,
      ssl,
    },
    useNullAsDefault: true,
    migrations: {
      directory: migrationsDirectory,
      loadExtensions: ['.mjs'],
    },
  });
};

export const getInMemoryKnex = (): Knex => {
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

export const getFileSystemKnex = (path: string): Knex => {
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
