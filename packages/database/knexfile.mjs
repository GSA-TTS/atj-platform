const migrationsDirectory = path.resolve(__dirname, './migrations');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  test: {
    client: 'better-sqlite3',
    connection: {
      filename: ':memory:',
      //filename: './main.db',
    },
    useNullAsDefault: true,
    migrations: {
      directory: migrationsDirectory,
      loadExtensions: ['.mjs'],
    },
  },
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
