import { type Result, type VoidResult } from '@atj/common';
import { type Session } from '@atj/forms';

export const getSessionFromStorage = (
  storage: Storage,
  id?: string
): Session | null => {
  if (!storage || !id) {
    return null;
  }
  const sessionString = storage.getItem(id);
  if (!sessionString) {
    return null;
  }
  return parseStringSession(sessionString);
};

export const addFormToStorage = (
  storage: Storage,
  session: Session
): Result<string> => {
  const uuid = crypto.randomUUID();

  const result = saveSessionToStorage(storage, uuid, session);
  if (!result.success) {
    return result;
  }

  return {
    success: true,
    data: uuid,
  };
};

export const saveSessionToStorage = (
  storage: Storage,
  sessionId: string,
  session: Session
): VoidResult => {
  try {
    storage.setItem(sessionId, stringifySession(session));
  } catch {
    return {
      success: false,
      error: `error saving '${sessionId}' to storage`,
    };
  }
  return {
    success: true,
  };
};

export const deleteSessionFromStorage = (
  storage: Storage,
  sessionId: string
) => {
  storage.removeItem(sessionId);
};

const stringifySession = (session: Session) => {
  return JSON.stringify(session);
};

const parseStringSession = (sessionString: string): Session => {
  return JSON.parse(sessionString) as Session;
};
