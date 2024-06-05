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

// src/operations/add-form.ts
var add_form_exports = {};
__export(add_form_exports, {
  addForm: () => addForm
});
module.exports = __toCommonJS(add_form_exports);

// src/context/browser/form-repo.ts
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
var uint8ArrayToBase64 = (buffer) => {
  let binary = "";
  const len = buffer.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  return btoa(binary);
};

// src/operations/add-form.ts
var addForm = (ctx, form) => {
  return addFormToStorage(ctx.storage, form);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addForm
});
