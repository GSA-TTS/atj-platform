"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/context/browser/session-repo.ts
var session_repo_exports = {};
__export(session_repo_exports, {
  addFormToStorage: () => addFormToStorage,
  deleteSessionFromStorage: () => deleteSessionFromStorage,
  getSessionFromStorage: () => getSessionFromStorage,
  saveSessionToStorage: () => saveSessionToStorage
});
module.exports = __toCommonJS(session_repo_exports);
var getSessionFromStorage = (storage, id) => {
  if (!storage || !id) {
    return null;
  }
  const sessionString = storage.getItem(id);
  if (!sessionString) {
    return null;
  }
  return parseStringSession(sessionString);
};
var addFormToStorage = (storage, session) => {
  const uuid = crypto.randomUUID();
  const result = saveSessionToStorage(storage, uuid, session);
  if (!result.success) {
    return result;
  }
  return {
    success: true,
    data: uuid
  };
};
var saveSessionToStorage = (storage, sessionId, session) => {
  try {
    storage.setItem(sessionId, stringifySession(session));
  } catch {
    return {
      success: false,
      error: `error saving '${sessionId}' to storage`
    };
  }
  return {
    success: true
  };
};
var deleteSessionFromStorage = (storage, sessionId) => {
  storage.removeItem(sessionId);
};
var stringifySession = (session) => {
  return JSON.stringify(session);
};
var parseStringSession = (sessionString) => {
  return JSON.parse(sessionString);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addFormToStorage,
  deleteSessionFromStorage,
  getSessionFromStorage,
  saveSessionToStorage
});
