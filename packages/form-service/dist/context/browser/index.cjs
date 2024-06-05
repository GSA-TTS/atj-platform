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

// src/context/browser/index.ts
var browser_exports = {};
__export(browser_exports, {
  createBrowserFormService: () => createBrowserFormService
});
module.exports = __toCommonJS(browser_exports);
var import_forms2 = require("@atj/forms");

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

// src/operations/add-form.ts
var addForm = (ctx, form) => {
  return addFormToStorage(ctx.storage, form);
};

// src/operations/delete-form.ts
var deleteForm = (ctx, formId) => {
  const form = getFormFromStorage(ctx.storage, formId);
  if (form === null) {
    return {
      success: false,
      error: `form '${formId} does not exist`
    };
  }
  deleteFormFromStorage(window.localStorage, formId);
  return {
    success: true
  };
};

// src/operations/get-form.ts
var getForm = (ctx, formId) => {
  const result = getFormFromStorage(ctx.storage, formId);
  if (result === null) {
    return {
      success: false,
      error: "not found"
    };
  }
  return {
    success: true,
    data: result
  };
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

// src/operations/save-form.ts
var saveForm = (ctx, formId, form) => {
  const result = saveFormToStorage(ctx.storage, formId, form);
  if (result.success === false) {
    return {
      success: false,
      error: result.error
    };
  }
  return {
    success: true,
    data: {
      timestamp: /* @__PURE__ */ new Date()
    }
  };
};

// src/operations/submit-form.ts
var import_forms = require("@atj/forms");
var submitForm = async (ctx, session, formId, formData) => {
  const form = getFormFromStorage(ctx.storage, formId);
  if (form === null) {
    return Promise.resolve({
      success: false,
      error: "Form not found"
    });
  }
  const newSessionResult = (0, import_forms.applyPromptResponse)(ctx.config, session, {
    action: "submit",
    data: formData
  });
  if (!newSessionResult.success) {
    return Promise.resolve({
      success: false,
      error: newSessionResult.error
    });
  }
  if (!(0, import_forms.sessionIsComplete)(ctx.config, newSessionResult.data)) {
    return Promise.resolve({
      success: false,
      error: "Session is not complete"
    });
  }
  return generateDocumentPackage(form, formData);
};
var generateDocumentPackage = async (form, formData) => {
  const errors = new Array();
  const documents = new Array();
  for (const document of form.outputs) {
    const docFieldData = (0, import_forms.createFormOutputFieldData)(document, formData);
    const pdfDocument = await (0, import_forms.fillPDF)(document.data, docFieldData);
    if (!pdfDocument.success) {
      errors.push(pdfDocument.error);
    } else {
      documents.push({
        fileName: document.path,
        data: pdfDocument.data
      });
    }
  }
  if (errors.length > 0) {
    return {
      success: false,
      error: errors.join("\n")
    };
  }
  return {
    success: true,
    data: documents
  };
};

// src/context/browser/index.ts
var createDefaultBrowserContext = () => ({
  storage: window.localStorage,
  config: import_forms2.defaultFormConfig
});
var createBrowserFormService = (opts) => {
  const ctx = opts || createDefaultBrowserContext();
  return {
    addForm(form) {
      return addForm(ctx, form);
    },
    deleteForm(formId) {
      return deleteForm(ctx, formId);
    },
    getForm(formId) {
      return getForm(ctx, formId);
    },
    getFormList() {
      return getFormList(ctx);
    },
    saveForm(formId, form) {
      return saveForm(ctx, formId, form);
    },
    submitForm(session, formId, formData) {
      return submitForm(ctx, session, formId, formData);
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createBrowserFormService
});
