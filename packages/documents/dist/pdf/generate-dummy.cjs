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

// src/pdf/generate-dummy.ts
var generate_dummy_exports = {};
__export(generate_dummy_exports, {
  generateDummyPDF: () => generateDummyPDF
});
module.exports = __toCommonJS(generate_dummy_exports);
var import_pdf_lib = require("pdf-lib");
var generateDummyPDF = async (formData) => {
  const pdfDoc = await import_pdf_lib.PDFDocument.create();
  const page = pdfDoc.addPage();
  page.drawText(
    JSON.stringify({
      timestamp: `Generated at ${(/* @__PURE__ */ new Date()).toISOString()}`,
      ...formData
    })
  );
  return await pdfDoc.save();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateDummyPDF
});
