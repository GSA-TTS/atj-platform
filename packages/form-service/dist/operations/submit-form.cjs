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

// src/operations/submit-form.ts
var submit_form_exports = {};
__export(submit_form_exports, {
  submitForm: () => submitForm
});
module.exports = __toCommonJS(submit_form_exports);
var import_forms = require("@atj/forms");

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

// src/operations/submit-form.ts
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  submitForm
});
