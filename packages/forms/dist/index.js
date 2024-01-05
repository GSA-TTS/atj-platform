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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  createForm: () => createForm,
  createFormContext: () => createFormContext,
  updateForm: () => updateForm
});
module.exports = __toCommonJS(src_exports);
var createForm = (summary, questions = []) => {
  return {
    summary,
    questions: Object.fromEntries(
      questions.map((question) => {
        return [question.id, question];
      })
    ),
    strategy: {
      type: "sequential",
      order: questions.map((question) => {
        return question.id;
      })
    }
  };
};
var createFormContext = (form) => {
  return {
    context: {
      errors: {},
      values: Object.fromEntries(
        Object.values(form.questions).map((question) => {
          return [question.id, question.initial];
        })
      )
    },
    form
  };
};
var updateForm = (context, id, value) => {
  if (!(id in context.form.questions)) {
    console.error(`Question "${id}" does not exist on form.`);
    return context;
  }
  const nextForm = addValue(context, id, value);
  if (context.form.questions[id].required && !value) {
    return addError(nextForm, id, "Required value not provided.");
  }
  return nextForm;
};
var addValue = (form, id, value) => ({
  ...form,
  context: {
    ...form.context,
    values: {
      ...form.context.values,
      [id]: value
    }
  }
});
var addError = (form, id, error) => ({
  ...form,
  context: {
    ...form.context,
    errors: {
      ...form.context.errors,
      [id]: error
    }
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createForm,
  createFormContext,
  updateForm
});
