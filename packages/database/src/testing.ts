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
  fn: (...args: Parameters<SuiteFactory>) => ReturnType<SuiteFactory>
) => {
  describe(`PostgreSQL - ${name}`, { timeout: 60000 }, test => {
    beforeEach<PostgresDbTestContext>(async context => {
      const container = await new PostgreSqlContainer().start();
      const connectionUri = container.getConnectionUri();
      const ctx = new PostgresDatabaseContext(connectionUri);
      context.db = {
        engine: 'postgres',
        container,
        ctx,
      };
    });
    afterEach<PostgresDbTestContext>(async context => {
      context.db.container.stop();
    });
    fn(test);
  });
  describe(`SQLite - ${name}`, test => {
    beforeEach<DbTestContext>(async context => {
      context.db = {
        engine: 'sqlite',
        ctx: new InMemoryDatabaseContext(),
      };
    });
    fn(test);
  });
};
