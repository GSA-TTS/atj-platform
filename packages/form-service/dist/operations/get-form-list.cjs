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

// src/operations/get-form-list.ts
var get_form_list_exports = {};
__export(get_form_list_exports, {
  getFormList: () => getFormList
});
module.exports = __toCommonJS(get_form_list_exports);

// src/context/browser/form-repo.ts
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
var base64ToUint8Array = (base64) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

// src/operations/get-form-list.ts
var getFormList = (ctx) => {
  const forms = getFormSummaryListFromStorage(ctx.storage);
  if (forms === null) {
    return {
      success: false,
      error: "error getting form list"
    };
  }
  return {
    success: true,
    data: forms
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFormList
});
