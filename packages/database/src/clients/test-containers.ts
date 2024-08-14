import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { Client } from 'pg';
import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest';

let dbHelper: TestDbManager | null = null;
let referenceCount = 0;

export const setupPersistentDatabaseTests = () => {
  if (!dbHelper) {
    dbHelper = new TestDbManager();
  }
  if (dbHelper === null) {
    throw new Error('TestDbManager is not initialized');
  }

  let connectionString: string;

  beforeAll(async () => {
    if (!TestDbManager.isContainerRunning()) {
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

class TestDbManager {
  private static referenceCount = 0;
  private static container: StartedPostgreSqlContainer | null = null;

  private readonly databaseName: string;

  constructor() {
    this.databaseName = `testdb_${Date.now()}`;
  }

  async startContainer() {
    if (TestDbManager.referenceCount === 0 && !TestDbManager.container) {
      TestDbManager.container = await new PostgreSqlContainer().start();
    }

    TestDbManager.referenceCount++;
  }

  async stopContainer() {
    TestDbManager.referenceCount--;
    if (TestDbManager.referenceCount === 0 && TestDbManager.container) {
      await TestDbManager.container.stop();
      TestDbManager.container = null;
    }
  }

  async createDatabase() {
    const client = new Client({
      host: TestDbManager.container!.getHost(),
      port: TestDbManager.container!.getMappedPort(5432),
      user: TestDbManager.container!.getUsername(),
      password: TestDbManager.container!.getPassword(),
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
        host: TestDbManager.container!.getHost(),
        port: TestDbManager.container!.getMappedPort(5432),
        user: TestDbManager.container!.getUsername(),
        password: TestDbManager.container!.getPassword(),
        database: 'postgres',
      });
      await client.connect();
      await client.query(`DROP DATABASE IF EXISTS ${this.databaseName};`);
      await client.end();
    }
  }

  getConnectionString() {
    const userName = TestDbManager.container!.getUsername();
    const password = TestDbManager.container!.getPassword();
    const hostName = TestDbManager.container!.getHost();
    const port = TestDbManager.container!.getMappedPort(5432);
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
    return TestDbManager.container !== null;
  }
}
