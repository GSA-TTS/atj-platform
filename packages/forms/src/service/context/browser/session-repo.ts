import { type Result, type VoidResult } from '@atj/common';
import { type FormSession } from '../../../index.js';

export const getSessionFromStorage = (
  storage: Storage,
  id?: string
): FormSession | null => {
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
  session: FormSession
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
  session: FormSession
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

const stringifySession = (session: FormSession) => {
  return JSON.stringify(session);
};

const parseStringSession = (sessionString: string): FormSession => {
  return JSON.parse(sessionString) as FormSession;
};
