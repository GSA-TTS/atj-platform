type QuestionId = string;

export type Question = {
  id: QuestionId;
  text: string;
  initial: string;
};
type QuestionValue = any;

export type FormContext = {
  context: {
    values: Record<QuestionId, QuestionValue>;
  };
  questions: Record<QuestionId, Question>;
};

export const createForm = (questions: Question[]): FormContext => {
  return {
    context: {
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
  if (!value) {
    return {
      ...form,
      context: { error: 'Required value not provided.' },
    };
  }
  return {
    ...form,
    context: {
      values: {
        ...form.context.values,
        [id]: value,
      },
    },
  };
};
