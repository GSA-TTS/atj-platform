import { createService } from '@atj/common';

import { DatabaseContext } from './context/types.js';
import { createSession } from './gateways/sessions/create-session.js';
import { createUser } from './gateways/users/create-user.js';
import { getUserId } from './gateways/users/get-user-id.js';

export {
  type DevDatabaseContext,
  createDevDatabaseContext,
} from './context/dev.js';
export { createTestDatabaseContext } from './context/test.js';
export { type Database } from './clients/kysely/index.js';
export { type DatabaseContext } from './context/types.js';
export { migrateDatabase } from './management/migrate-database.js';

export const createDatabaseGateway = (ctx: DatabaseContext) =>
  createService(ctx, {
    createSession,
    createUser,
    getUserId,
  });

export type DatabaseGateway = ReturnType<typeof createDatabaseGateway>;
