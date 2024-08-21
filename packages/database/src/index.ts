import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { DatabaseContext } from './context/types.js';
import {
  type FormRepository,
  createFormsRepository,
} from './gateways/forms/index.js';
import {
  type AuthRepository,
  createAuthRepository,
} from './gateways/auth/index.js';

export {
  type AuthRepository,
  type FormRepository,
  createAuthRepository,
  createFormsRepository,
};
export {
  type FilesystemDatabaseContext,
  createFilesystemDatabaseContext,
} from './context/file-system.js';
export { createInMemoryDatabaseContext } from './context/in-memory.js';
export { createPostgresDatabaseContext } from './context/postgres.js';
export { type Database } from './clients/kysely/types.js';
export { type DatabaseContext } from './context/types.js';
export { migrateDatabase } from './management/migrate-database.js';

export const getDatabaseTestContainerGlobalSetupPath = () => {
  return join(dirname(fileURLToPath(import.meta.url)), '../../vitest.setup.ts');
};

export const createDatabaseGateway = (ctx: DatabaseContext) => {
  return {
    auth: createAuthRepository(ctx),
    forms: createFormsRepository(ctx),
  };
};

export type DatabaseGateway = ReturnType<typeof createDatabaseGateway>;
