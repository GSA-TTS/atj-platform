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

// src/__tests__/sample-data.ts
var sample_data_exports = {};
__export(sample_data_exports, {
  loadSampleFields: () => loadSampleFields,
  loadSamplePDF: () => loadSamplePDF
});
module.exports = __toCommonJS(sample_data_exports);
var import_path = __toESM(require("path"), 1);
var import_fs = require("fs");
var samplesDirectory = import_path.default.resolve(__dirname, "../../samples");
var loadSamplePDF = async (fileName) => {
  const samplePdfPath = import_path.default.join(samplesDirectory, fileName);
  return await import_fs.promises.readFile(samplePdfPath);
};
var loadSampleFields = async (fileName) => {
  const sampleJsonPath = import_path.default.join(samplesDirectory, fileName);
  const data = await import_fs.promises.readFile(sampleJsonPath);
  return JSON.parse(data.toString());
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loadSampleFields,
  loadSamplePDF
});
