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

export type Form<T extends FormStrategy> = {
  summary: FormSummary;
  questions: Record<QuestionId, Question>;
  strategy: T;
};

export type FormContext = {
  context: {
    errors: ErrorMap;
    values: QuestionValueMap;
  };
  form: Form;
};

export type SequentialStrategy = {
  type: 'sequential';
  order: QuestionId[];
};

export type NullStrategy = {
  type: 'null';
};

export type FormStrategy = SequentialStrategy | NullStrategy;

export const createForm = (
  summary: FormSummary,
  questions: Question[] = []
): Form => {
  return {
    summary,
    questions: getQuestionMap(questions),
    strategy: {
      type: 'sequential',
      order: questions.map(question => {
        return question.id;
      }),
    },
  };
};

export const createFormContext = (form: Form): FormContext => {
  return {
    context: {
      errors: {},
      values: Object.fromEntries(
        Object.values(form.questions).map(question => {
          return [question.id, question.initial];
        })
      ),
    },
    form,
  };
};

// For now, a prompt just returns an array of questions. This will likely need
// to be filled out to support more complicated display formats.
export const createPrompt = (formContext: FormContext) => {
  if (formContext.form.strategy.type === 'sequential') {
    return formContext.form.strategy.order.map(questionId => {
      const question = formContext.form.questions[questionId];
      // This is the structure currently used by FormFieldset in the Astro app.
      // FIXME: Shore up this type and add to the forms package.
      return {
        tag: 'input',
        type: 'text',
        name: question.id,
        id: question.id,
        value: formContext.context.values[questionId],
        label: question.text,
      };
    });
  } else if (formContext.form.strategy.type === 'null') {
    return [];
  } else {
    const _exhaustiveCheck: never = formContext.form.strategy;
    return _exhaustiveCheck;
  }
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

const getQuestionMap = (questions: Question[]) => {
  return Object.fromEntries(
    questions.map(question => {
      return [question.id, question];
    })
  );
};

export const addQuestions = (
  form: Form<SequentialStrategy>,
  questions: Question[]
) => {
  const questionMap = getQuestionMap(questions);
  return {
    ...form,
    questions: { ...form.questions, ...questionMap },
    strategy: {
      ...form.strategy,
      order: [...form.strategy.order, ...Object.keys(questionMap)],
    },
  };
};
