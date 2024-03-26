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

// src/pdf/generate.ts
var generate_exports = {};
__export(generate_exports, {
  createFormOutputFieldData: () => createFormOutputFieldData,
  fillPDF: () => fillPDF
});
module.exports = __toCommonJS(generate_exports);
var import_pdf_lib = require("pdf-lib");
var createFormOutputFieldData = (output, formData) => {
  const results = {};
  Object.entries(output.fields).forEach(([elementId, docField]) => {
    if (docField.type === "not-supported") {
      return;
    }
    const fieldId = output.formFields[elementId];
    const outputFieldId = output.formFields[elementId];
    results[outputFieldId] = {
      type: docField.type,
      value: formData[fieldId]
    };
  });
  return results;
};
var fillPDF = async (pdfBytes, fieldData) => {
  const pdfDoc = await import_pdf_lib.PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();
  try {
    Object.entries(fieldData).forEach(([name, value]) => {
      setFormFieldData(form, value.type, name, value.value);
    });
  } catch (error) {
    return {
      success: false,
      error: error?.message || "error setting PDF field"
    };
  }
  return {
    success: true,
    data: await pdfDoc.save()
  };
};
var setFormFieldData = (form, fieldType, fieldName, fieldValue) => {
  if (fieldType === "TextField") {
    const field = form.getTextField(fieldName);
    field.setText(fieldValue);
  } else if (fieldType === "CheckBox") {
    const field = form.getCheckBox(fieldName);
    if (fieldValue) {
      field.check();
    } else {
      field.uncheck();
    }
  } else if (fieldType === "Dropdown") {
    const field = form.getDropdown(fieldName);
    field.select(fieldValue);
  } else if (fieldType === "OptionList") {
    const field = form.getDropdown(fieldName);
    field.select(fieldValue);
  } else if (fieldType === "RadioGroup") {
    const field = form.getRadioGroup(fieldName);
    field.select(fieldValue);
  } else if (fieldType === "Paragraph") {
  } else {
    const exhaustiveCheck = fieldType;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createFormOutputFieldData,
  fillPDF
});
