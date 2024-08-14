/**
 * This module provides a describeDatabase function that can be used to run
 * tests against both SQLite and PostgreSQL databases.
 */
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { afterEach, beforeEach, describe, SuiteFactory } from 'vitest';

import { type Engine } from './clients/kysely/types';
import { InMemoryDatabaseContext } from './context/in-memory';
import { PostgresDatabaseContext } from './context/postgres';
import { type DatabaseContext } from './context/types';
import { migrateDatabase } from './management/migrate-database';

export type DbTestContext = {
  db: {
    engine: Engine;
    ctx: DatabaseContext;
  };
};

type PostgresDbTestContext = DbTestContext & {
  db: DbTestContext['db'] & {
    container: StartedPostgreSqlContainer;
  };
};

export const describeDatabase = (
  name: string,
  fn: (...args: Parameters<SuiteFactory>) => ReturnType<SuiteFactory>,
  runMigrations: boolean = true
) => {
  describe(`PostgreSQL - ${name}`, { timeout: 60000 }, test => {
    beforeEach<PostgresDbTestContext>(async context => {
      const container = await new PostgreSqlContainer().start();
      const connectionUri = container.getConnectionUri();
      const ctx = new PostgresDatabaseContext(connectionUri);
      if (runMigrations) {
        await migrateDatabase(ctx);
      }
      context.db = {
        engine: 'postgres',
        container,
        ctx,
      };
    });

    afterEach<PostgresDbTestContext>(async ({ db }) => {
      db.ctx.destroy();
    });

    fn(test);
  });

  describe(`SQLite - ${name}`, test => {
    beforeEach<DbTestContext>(async context => {
      const ctx = new InMemoryDatabaseContext();
      if (runMigrations) {
        await migrateDatabase(ctx);
      }
      context.db = {
        engine: 'sqlite',
        ctx,
      };
    });

    afterEach<DbTestContext>(async ({ db }) => {
      db.ctx.destroy();
    });

    fn(test);
  });
};
