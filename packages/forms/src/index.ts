type QuestionId = string;

export type Question = {
  id: QuestionId;
  text: string;
  initial: string;
  required: boolean;
};
type QuestionValue = any;
type QuestionValueMap = Record<QuestionId, QuestionValue>;
type ErrorMap = Record<QuestionId, string>;

export type FormContext = {
  context: {
    errors: ErrorMap;
    values: QuestionValueMap;
  };
  questions: Record<QuestionId, Question>;
};

export const createFormContextFromQuestions = (
  questions: Question[]
): FormContext => {
  return {
    context: {
      errors: {},
      values: Object.fromEntries(
        questions.map(question => {
          return [question.id, question.initial];
        })
      ),
    },
    questions: Object.fromEntries(
      questions.map(question => {
        return [question.id, question];
      })
    ),
  };
};

export const updateForm = (form: FormContext, id: QuestionId, value: any) => {
  if (!(id in form.questions)) {
    console.error(`Question "${id}" does not exist on form.`);
    return form;
  }
  const nextForm = addValue(form, id, value);
  if (form.questions[id].required && !value) {
    return addError(nextForm, id, 'Required value not provided.');
  }
  return nextForm;
};

const addValue = (
  form: FormContext,
  id: QuestionId,
  value: QuestionValue
): FormContext => ({
  ...form,
  context: {
    ...form.context,
    values: {
      ...form.context.values,
      [id]: value,
    },
  },
});

const addError = (
  form: FormContext,
  id: QuestionId,
  error: string
): FormContext => ({
  ...form,
  context: {
    ...form.context,
    errors: {
      ...form.context.errors,
      [id]: error,
    },
  },
});
