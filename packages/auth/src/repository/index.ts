import { createService } from '@atj/common';
import { type DatabaseContext } from '@atj/database';

import { createSession } from './create-session.js';
import { createUser } from './create-user.js';
import { getUserId } from './get-user-id.js';

export const createAuthRepository = (ctx: DatabaseContext) =>
  createService(ctx, {
    createSession,
    createUser,
    getUserId,
  });

export type AuthRepository = ReturnType<typeof createAuthRepository>;
