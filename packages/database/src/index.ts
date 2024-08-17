import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { createService } from '@atj/common';

import { DatabaseContext } from './context/types.js';
import { createSession } from './gateways/sessions/create-session.js';
import { createUser } from './gateways/users/create-user.js';
import { getUserId } from './gateways/users/get-user-id.js';

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

export const createDatabaseGateway = (ctx: DatabaseContext) =>
  createService(ctx, {
    createSession,
    createUser,
    getUserId,
  });

export type DatabaseGateway = ReturnType<typeof createDatabaseGateway>;
