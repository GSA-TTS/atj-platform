import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { Client } from 'pg';
import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest';

let dbHelper: PgTestDbManager | null = null;
let referenceCount = 0;

export const setupPersistentDatabaseTests = () => {
  if (!dbHelper) {
    dbHelper = new PgTestDbManager();
  }
  if (dbHelper === null) {
    throw new Error('PgTestDbManager is not initialized');
  }

  let connectionString: string;

  beforeAll(async () => {
    if (!PgTestDbManager.isContainerRunning()) {
      await dbHelper!.startContainer();
    }
    referenceCount++;
  });

  afterAll(async () => {
    referenceCount--;
    if (referenceCount === 0 && !isWatchMode()) {
      await dbHelper!.stopContainer();
      dbHelper = null;
    }
  });

  beforeEach(async () => {
    connectionString = await dbHelper!.createDatabase();
    await dbHelper!.initializeSchema(connectionString);
  });

  afterEach(async () => {
    await dbHelper!.dropDatabase();
  });

  return {
    getConnectionString: () => connectionString,
  };
};

function isWatchMode() {
  return process.env.VITEST_MODE === 'WATCH';
}

class PgTestDbManager {
  private static referenceCount = 0;
  private static container: StartedPostgreSqlContainer | null = null;

  private readonly databaseName: string;

  constructor() {
    this.databaseName = `testdb_${Date.now()}`;
  }

  async startContainer() {
    if (PgTestDbManager.referenceCount === 0 && !PgTestDbManager.container) {
      PgTestDbManager.container = await new PostgreSqlContainer().start();
    }

    PgTestDbManager.referenceCount++;
  }

  async stopContainer() {
    PgTestDbManager.referenceCount--;
    if (PgTestDbManager.referenceCount === 0 && PgTestDbManager.container) {
      await PgTestDbManager.container.stop();
      PgTestDbManager.container = null;
    }
  }

  async createDatabase() {
    const client = new Client({
      host: PgTestDbManager.container!.getHost(),
      port: PgTestDbManager.container!.getMappedPort(5432),
      user: PgTestDbManager.container!.getUsername(),
      password: PgTestDbManager.container!.getPassword(),
      database: 'postgres',
    });
    await client.connect();
    await client.query(`CREATE DATABASE ${this.databaseName};`);
    await client.end();

    return this.getConnectionString();
  }

  async dropDatabase() {
    if (this.databaseName) {
      const client = new Client({
        host: PgTestDbManager.container!.getHost(),
        port: PgTestDbManager.container!.getMappedPort(5432),
        user: PgTestDbManager.container!.getUsername(),
        password: PgTestDbManager.container!.getPassword(),
        database: 'postgres',
      });
      await client.connect();
      await client.query(`DROP DATABASE IF EXISTS ${this.databaseName};`);
      await client.end();
    }
  }

  getConnectionString() {
    const userName = PgTestDbManager.container!.getUsername();
    const password = PgTestDbManager.container!.getPassword();
    const hostName = PgTestDbManager.container!.getHost();
    const port = PgTestDbManager.container!.getMappedPort(5432);
    return `postgresql://${userName}:${password}@${hostName}:${port}/${this.databaseName}`;
  }

  async initializeSchema(connectionString: string) {
    const client = new Client({ connectionString });
    await client.connect();
    await client.query(
      `CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100));`
    );
    await client.end();
  }

  static isContainerRunning() {
    return PgTestDbManager.container !== null;
  }
}
