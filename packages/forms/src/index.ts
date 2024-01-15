import { DocumentFieldMap } from './documents';

export * from './documents';
export * from './prompts';

type QuestionId = string;

export type Question = {
  id: QuestionId;
  text: string;
  initial: string | boolean | string[]; // TODO: create separate types
  required: boolean;
};
type QuestionValue = any;
type QuestionValueMap = Record<QuestionId, QuestionValue>;
type ErrorMap = Record<QuestionId, string>;

export type FormSummary = {
  title: string;
  description: string;
};

export type Form<T extends FormStrategy = SequentialStrategy> = {
  summary: FormSummary;
  questions: Record<QuestionId, Question>;
  strategy: T;
  documents: FormOutput[];
};

export type FormContext<T extends FormStrategy> = {
  context: {
    errors: ErrorMap;
    values: QuestionValueMap;
  };
  form: Form<T>;
};

export type SequentialStrategy = {
  type: 'sequential';
  order: QuestionId[];
};

export type NullStrategy = {
  type: 'null';
};

export type FormStrategy = SequentialStrategy | NullStrategy;

type FormOutput = {
  data: Uint8Array;
  path: string;
  fields: DocumentFieldMap;
  formFields: Record<string, string>;
};

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
    documents: [],
  };
};

export const createFormContext = <T extends FormStrategy>(
  form: Form<T>
): FormContext<T> => {
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

export const updateForm = <T extends FormStrategy>(
  context: FormContext<T>,
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

const addValue = <T extends FormStrategy>(
  form: FormContext<T>,
  id: QuestionId,
  value: QuestionValue
): FormContext<T> => ({
  ...form,
  context: {
    ...form.context,
    values: {
      ...form.context.values,
      [id]: value,
    },
  },
});

const addError = <T extends FormStrategy>(
  form: FormContext<T>,
  id: QuestionId,
  error: string
): FormContext<T> => ({
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

export const getFlatFieldList = <T extends FormStrategy>(form: Form<T>) => {
  if (form.strategy.type === 'sequential') {
    return form.strategy.order.map(questionId => {
      return form.questions[questionId];
    });
  } else if (form.strategy.type === 'null') {
    return [];
  } else {
    const _exhaustiveCheck: never = form.strategy;
    return _exhaustiveCheck;
  }
};

export const addFormOutput = <T extends FormStrategy>(
  form: Form<T>,
  document: FormOutput
) => {
  return {
    ...form,
    documents: [...form.documents, document],
  };
};
