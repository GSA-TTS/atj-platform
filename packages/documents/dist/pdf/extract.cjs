"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/pdf/extract.ts
var extract_exports = {};
__export(extract_exports, {
  getDocumentFieldData: () => getDocumentFieldData
});
module.exports = __toCommonJS(extract_exports);
var pdfLib = __toESM(require("pdf-lib"), 1);

// src/util.ts
var stringToBase64 = (input) => {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(input, "utf-8").toString("base64");
  } else {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(input);
    let binaryString = encoded.reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    return window.btoa(binaryString);
  }
};

// src/pdf/extract.ts
var getDocumentFieldData = async (pdfBytes) => {
  const pdfDoc = await pdfLib.PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();
  const fields = form.getFields();
  return Object.fromEntries(
    fields.map((field) => {
      return [stringToBase64(field.getName()), getFieldValue(field)];
    })
  );
};
var getFieldValue = (field) => {
  if (field instanceof pdfLib.PDFTextField) {
    return {
      type: "TextField",
      name: field.getName(),
      label: field.getName(),
      value: field.getText() || "",
      maxLength: field.getMaxLength(),
      required: field.isRequired()
    };
  } else if (field instanceof pdfLib.PDFCheckBox) {
    return {
      type: "CheckBox",
      name: field.getName(),
      label: field.getName(),
      value: field.isChecked(),
      required: field.isRequired()
    };
  } else if (field instanceof pdfLib.PDFDropdown) {
    return {
      type: "Dropdown",
      name: field.getName(),
      label: field.getName(),
      value: field.getSelected(),
      required: field.isRequired()
    };
  } else if (field instanceof pdfLib.PDFOptionList) {
    return {
      type: "OptionList",
      name: field.getName(),
      label: field.getName(),
      value: field.getSelected(),
      required: field.isRequired()
    };
  } else if (field instanceof pdfLib.PDFRadioGroup) {
    return {
      type: "RadioGroup",
      name: field.getName(),
      options: field.getOptions(),
      label: field.getName(),
      value: field.getSelected() || "",
      // pdfLib allows this to be undefined
      required: field.isRequired()
    };
  } else {
    return {
      type: "not-supported",
      name: field.getName(),
      error: `unsupported type: ${field.constructor.name}`
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDocumentFieldData
});
