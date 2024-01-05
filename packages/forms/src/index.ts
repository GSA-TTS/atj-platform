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

export type FormSummary = {
  title: string;
  description: string;
};

export type Form = {
  summary: FormSummary;
  questions: Record<QuestionId, Question>;
};

export type FormContext = {
  context: {
    errors: ErrorMap;
    values: QuestionValueMap;
  };
  form: Form;
};

export const createForm = (
  summary: FormSummary,
  questions: Question[] = []
): Form => {
  return {
    summary,
    questions: Object.fromEntries(
      questions.map(question => {
        return [question.id, question];
      })
    ),
  };
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
    form: createForm(
      {
        title: 'Form sample',
        description: 'Form sample created via a list of questions.',
      },
      questions
    ),
  };
};

export const updateForm = (
  context: FormContext,
  id: QuestionId,
  value: any
) => {
  if (!(id in context.form.questions)) {
    console.error(`Question "${id}" does not exist on form.`);
    return context;
  }
  const nextForm = addValue(context, id, value);
  if (context.form.questions[id].required && !value) {
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
