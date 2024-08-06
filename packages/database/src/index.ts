import { createService } from '@atj/common';

import { DatabaseContext } from './context/types';
import { createSession } from './gateways/sessions/create-session';
import { createUser } from './gateways/users/create-user';
import { getUserId } from './gateways/users/get-user-id';

export {
  type DevDatabaseContext,
  createDevDatabaseContext,
} from './context/dev';
export { createTestDatabaseContext } from './context/test';
export { type Database } from './clients/kysely';
export { type DatabaseContext } from './context/types';
export { migrateDatabase } from './management/migrate-database';

export const createDatabaseGateway = (ctx: DatabaseContext) =>
  createService(ctx, {
    createSession,
    createUser,
    getUserId,
  });

export type DatabaseGateway = ReturnType<typeof createDatabaseGateway>;
