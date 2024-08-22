import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export { dateValue } from './clients/kysely/db-helpers.js';
export {
  type FilesystemDatabaseContext,
  createFilesystemDatabaseContext,
} from './context/file-system.js';
export { createInMemoryDatabaseContext } from './context/in-memory.js';
export { createPostgresDatabaseContext } from './context/postgres.js';
export { type Database } from './clients/kysely/types.js';
export { type DatabaseContext } from './context/types.js';
export { migrateDatabase } from './management/migrate-database.js';

export const getVitestDatabaseContainerGlobalSetupPath = () => {
  return join(dirname(fileURLToPath(import.meta.url)), '../../vitest.setup.ts');
};
