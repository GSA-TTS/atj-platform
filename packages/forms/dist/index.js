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
  addDocument: () => addDocument,
  addQuestions: () => addQuestions,
  createForm: () => createForm,
  createFormContext: () => createFormContext,
  createPrompt: () => createPrompt,
  getFlatFieldList: () => getFlatFieldList,
  updateForm: () => updateForm
});
module.exports = __toCommonJS(src_exports);

// src/prompts/index.ts
var createPrompt = (formContext) => {
  const parts = [
    {
      type: "form-summary",
      title: formContext.form.summary.title,
      description: formContext.form.summary.description
    }
  ];
  if (formContext.form.strategy.type === "sequential") {
    parts.push(
      ...formContext.form.strategy.order.map((questionId) => {
        const question = formContext.form.questions[questionId];
        return {
          type: "text",
          id: question.id,
          value: formContext.context.values[questionId],
          label: question.text,
          required: question.required
        };
      })
    );
  } else if (formContext.form.strategy.type === "null") {
  } else {
    const _exhaustiveCheck = formContext.form.strategy;
  }
  return parts;
};

// src/index.ts
var createForm = (summary, questions = []) => {
  return {
    summary,
    questions: getQuestionMap(questions),
    strategy: {
      type: "sequential",
      order: questions.map((question) => {
        return question.id;
      })
    },
    documents: []
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
var getQuestionMap = (questions) => {
  return Object.fromEntries(
    questions.map((question) => {
      return [question.id, question];
    })
  );
};
var addQuestions = (form, questions) => {
  const questionMap = getQuestionMap(questions);
  return {
    ...form,
    questions: { ...form.questions, ...questionMap },
    strategy: {
      ...form.strategy,
      order: [...form.strategy.order, ...Object.keys(questionMap)]
    }
  };
};
var getFlatFieldList = (form) => {
  if (form.strategy.type === "sequential") {
    return form.strategy.order.map((questionId) => {
      return form.questions[questionId];
    });
  } else if (form.strategy.type === "null") {
    return [];
  } else {
    const _exhaustiveCheck = form.strategy;
    return _exhaustiveCheck;
  }
};
var addDocument = (form, document) => {
  return {
    ...form,
    documents: [...form.documents, document]
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addDocument,
  addQuestions,
  createForm,
  createFormContext,
  createPrompt,
  getFlatFieldList,
  updateForm
});
