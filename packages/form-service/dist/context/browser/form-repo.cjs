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

// src/context/browser/form-repo.ts
var form_repo_exports = {};
__export(form_repo_exports, {
  addFormToStorage: () => addFormToStorage,
  deleteFormFromStorage: () => deleteFormFromStorage,
  getFormFromStorage: () => getFormFromStorage,
  getFormListFromStorage: () => getFormListFromStorage,
  getFormSummaryListFromStorage: () => getFormSummaryListFromStorage,
  saveFormToStorage: () => saveFormToStorage
});
module.exports = __toCommonJS(form_repo_exports);
var getFormFromStorage = (storage, id) => {
  if (!storage || !id) {
    return null;
  }
  const formString = storage.getItem(id);
  if (!formString) {
    return null;
  }
  return parseStringForm(formString);
};
var getFormListFromStorage = (storage) => {
  const keys = [];
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (key === null) {
      return null;
    }
    keys.push(key);
  }
  return keys;
};
var getFormSummaryListFromStorage = (storage) => {
  const forms = getFormListFromStorage(storage);
  if (forms === null) {
    return null;
  }
  return forms.map((key) => {
    const form = getFormFromStorage(storage, key);
    if (form === null) {
      throw new Error("key mismatch");
    }
    return {
      id: key,
      title: form.summary.title,
      description: form.summary.description
    };
  });
};
var addFormToStorage = (storage, form) => {
  const uuid = crypto.randomUUID();
  const result = saveFormToStorage(storage, uuid, form);
  if (!result.success) {
    return result;
  }
  return {
    success: true,
    data: {
      timestamp: /* @__PURE__ */ new Date(),
      id: uuid
    }
  };
};
var saveFormToStorage = (storage, formId, form) => {
  try {
    storage.setItem(formId, stringifyForm(form));
  } catch {
    return {
      success: false,
      error: `error saving '${formId}' to storage`
    };
  }
  return {
    success: true
  };
};
var deleteFormFromStorage = (storage, formId) => {
  storage.removeItem(formId);
};
var stringifyForm = (form) => {
  return JSON.stringify({
    ...form,
    outputs: form.outputs.map((output) => ({
      ...output,
      // TODO: we probably want to do this somewhere in the documents module
      data: uint8ArrayToBase64(output.data)
    }))
  });
};
var parseStringForm = (formString) => {
  const form = JSON.parse(formString);
  return {
    ...form,
    outputs: form.outputs.map((output) => ({
      ...output,
      data: base64ToUint8Array(output.data)
    }))
  };
};
var uint8ArrayToBase64 = (buffer) => {
  let binary = "";
  const len = buffer.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  return btoa(binary);
};
var base64ToUint8Array = (base64) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addFormToStorage,
  deleteFormFromStorage,
  getFormFromStorage,
  getFormListFromStorage,
  getFormSummaryListFromStorage,
  saveFormToStorage
});
