import { createService } from '@atj/common';

import type { DatabaseContext } from '../../context/types';

import { createSession } from './create-session';
import { createUser } from './create-user';
import { getUserId } from './get-user-id';

export const createAuthRepository = (ctx: DatabaseContext) =>
  createService(ctx, {
    createSession,
    createUser,
    getUserId,
  });

export type AuthRepository = ReturnType<typeof createAuthRepository>;
